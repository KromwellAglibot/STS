const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'solutions.json');
// ensure file exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'project-guide.html'));
});

// API: get solutions
app.get('/api/solutions', (req, res) => {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const list = JSON.parse(raw || '[]');
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read solutions' });
  }
});

// API: post a new solution
app.post('/api/solutions', (req, res) => {
  const { title, author, summary, sources, tags } = req.body || {};
  if (!summary || typeof summary !== 'string') {
    return res.status(400).json({ error: 'Summary is required' });
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const list = JSON.parse(raw || '[]');
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2,8);
    const entry = {
      id,
      title: title || 'Untitled',
      author: author || 'Anonymous',
      summary,
      sources: Array.isArray(sources) ? sources : (typeof sources === 'string' && sources.length ? sources.split(',').map(s=>s.trim()).filter(Boolean) : []),
      tags: Array.isArray(tags) ? tags : (typeof tags === 'string' && tags.length ? tags.split(',').map(t=>t.trim()).filter(Boolean) : []),
      createdAt: new Date().toISOString()
    };
    list.unshift(entry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf8');
    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save solution' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
