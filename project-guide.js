// Interactive features for project-guide.html

document.addEventListener('DOMContentLoaded', function() {
    // Animated hero title
    const title = document.querySelector('.animated-title');
    if (title) {
        title.style.opacity = 0;
        setTimeout(() => {
            title.style.transition = 'opacity 1.2s cubic-bezier(.68,-0.55,.27,1.55)';
            title.style.opacity = 1;
        }, 300);
    }

    // Interactive cards for objectives and concept guide
    document.querySelectorAll('.interactive-cards .card').forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            card.classList.add('active');
        });
        card.addEventListener('mouseleave', function() {
            card.classList.remove('active');
        });
        card.addEventListener('click', function() {
            card.classList.toggle('selected');
            // toggle details panel
            const det = card.querySelector('.card-details');
            if (det) det.classList.toggle('open');
        });
    });

    // Attach details/prompts to each card
    const cardPrompts = {
        '1': {
            title: 'Using Inquiry Tools',
            prompts: [
                'What primary and secondary sources will you consult?',
                'What questions will guide your research?',
                'What methods will you use to analyze evidence?'
            ],
            examples: ['Interview an expert; analyze dataset; review academic articles']
        },
        '2': { title: 'Roles & Influence', prompts:['Which individuals or groups affect this issue?','What are their motivations?'], examples:['NGOs, corporations, government agencies'] },
        '3': { title: 'History/Geography/Politics', prompts:['Which historical events shaped the issue?','How does geography influence outcomes?'], examples:['Industrialization, policy changes, local climate'] },
        '4': { title: 'Propose a Solution', prompts:['What is your solution?','What resources are required?','Who benefits?'], examples:['Policy change, local education program, tech prototype'] },
        'c1': { title: 'Persuasion & Dispute', prompts:['What arguments exist on each side?','What evidence supports each argument?'], examples:['Editorials, official statements, research papers'] },
        'c2': { title: 'Facts vs Inferences', prompts:['Which statements are observable facts?','Which are interpretations?'], examples:['Data tables vs opinion pieces'] },
        'c3': { title: 'Groups & Solutions', prompts:['Which groups propose solutions?','How inclusive are these solutions?'], examples:['Community groups, industry coalitions'] },
        'c4': { title: 'Media Role', prompts:['Which media sources shape opinion?','How can media bias be identified?'], examples:['News outlets, social platforms'] },
        'c5': { title: 'Historical Development', prompts:['What are the major turning points?','What patterns repeat?'], examples:['Timeline of regulations'] },
        'c6': { title: 'Historical Relationships', prompts:['How do past events influence current policy?'], examples:['Past pandemics and current public health responses'] },
        'c7': { title: 'Geo / Culture / Economics', prompts:['How do location and culture affect the issue?','What economic incentives exist?'], examples:['Urban vs rural differences'] },
        'c8': { title: 'Impact on Society', prompts:['Who is most affected?','What are short- and long-term effects?'], examples:['Health, livelihoods, environment'] },
        'c9': { title: 'Implications', prompts:['Local vs national impacts?','International consequences?'], examples:['Trade restrictions, migration'] },
        'c10': { title: 'Evaluate Solutions', prompts:['How will you measure success?','What evidence will you collect?'], examples:['Surveys, pilot program metrics'] }
    };

    document.querySelectorAll('.interactive-cards .card').forEach(function(card) {
        const key = card.dataset.card;
        const info = cardPrompts[key];
        if (info) {
            const details = document.createElement('div');
            details.className = 'card-details';
            details.innerHTML = `<strong>${info.title}</strong><ul>${info.prompts.map(p=>`<li>${p}</li>`).join('')}</ul><div class="examples"><em>Examples: ${info.examples.join('; ')}</em></div>`;
            card.appendChild(details);
        }
    });

    // small helper to create nodes
    function el(tag, attrs, txt) { const e = document.createElement(tag); if (attrs) Object.keys(attrs).forEach(k=>e.setAttribute(k, attrs[k])); if (txt) e.textContent = txt; return e; }

    // Solution Wall: display all submitted solutions
    const solutionSection = document.getElementById('solution');
    const solutionWall = document.getElementById('solution-wall');
    if (solutionSection && solutionWall) {
        // Build full form: title, author, summary, sources, tags
        const form = document.createElement('form');
        form.id = 'solution-form';
        form.innerHTML = `
            <label for="title">Title (optional):</label>
            <input id="title" name="title" placeholder="Short title" />
            <label for="author">Author (optional):</label>
            <input id="author" name="author" placeholder="Your name" />
            <label for="summary">Summary / Proposal:</label>
            <textarea id="summary" name="summary" rows="4" required placeholder="Describe your solution, steps, and expected impact..."></textarea>
            <label for="sources">Sources (comma-separated URLs or citations):</label>
            <input id="sources" name="sources" placeholder="https://..., Article title; ..." />
            <label for="tags">Tags (comma-separated):</label>
            <input id="tags" name="tags" placeholder="education,policy,health" />
            <div style="margin-top:10px;"><button type="submit">Submit Proposal</button> <button type="button" id="clear-form">Clear</button></div>
        `;
        document.getElementById('submission-controls').appendChild(form);

        // load existing solutions from server
        fetch('/api/solutions').then(r=>r.json()).then(list=>{
            list.forEach(addSolutionEntry);
        }).catch(err=>{
            console.warn('failed to load solutions', err);
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const payload = {
                title: document.getElementById('title').value.trim(),
                author: document.getElementById('author').value.trim(),
                summary: document.getElementById('summary').value.trim(),
                sources: document.getElementById('sources').value.trim(),
                tags: document.getElementById('tags').value.trim()
            };
            if (!payload.summary) return alert('Please enter a summary for your proposal.');
            fetch('/api/solutions', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })
                .then(r=>r.json()).then(created=>{
                    addSolutionEntry(created, true);
                    form.reset();
                }).catch(err=>{ console.error(err); alert('Failed to submit proposal'); });
        });

        document.getElementById('clear-form').addEventListener('click', function(){ document.getElementById('solution-form').reset(); });

        // helper to add entry node
        function addSolutionEntry(item, flash) {
            const entry = document.createElement('div');
            entry.className = 'solution-entry';
            const meta = `<strong>${escapeHtml(item.title || 'Untitled')}</strong> <small>by ${escapeHtml(item.author || 'Anonymous')}</small> <div class="meta">${new Date(item.createdAt).toLocaleString()}</div>`;
            const sources = (item.sources && item.sources.length) ? `<div class="sources">Sources: ${item.sources.map(escapeHtml).join(', ')}</div>` : '';
            const tags = (item.tags && item.tags.length) ? `<div class="tags">Tags: ${item.tags.map(escapeHtml).join(', ')}</div>` : '';
            entry.innerHTML = `<div style="flex:1">${meta}<p>${escapeHtml(item.summary)}</p>${sources}${tags}</div>`;
            const tools = document.createElement('div');
            tools.style.marginLeft = '12px';
            const exportBtn = el('button', { type:'button' }, 'Export');
            exportBtn.addEventListener('click', ()=>{ downloadJSON(item, `${(item.title||'solution').replace(/\s+/g,'_')}-${item.id}.json`); });
            tools.appendChild(exportBtn);
            entry.appendChild(tools);
            if (flash) {
                entry.style.border = '2px solid #00c6fb';
            }
            solutionWall.prepend(entry);
        }

        function escapeHtml(s){ return String(s||'').replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
        function downloadJSON(obj, name){ const blob = new Blob([JSON.stringify(obj, null, 2)], {type:'application/json'}); const url = URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=name; a.click(); URL.revokeObjectURL(url); }
    }
});
