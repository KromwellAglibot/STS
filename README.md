# Simple JS & CSS Web App

This is a basic web application built with HTML, JavaScript, and CSS.

## Features
- Displays a heading and a button.
- Clicking the button changes the heading text and color.

## Files
- `index.html`: Main HTML file.
- `main.js`: JavaScript logic for interactivity.
- `styles.css`: CSS for styling.

## How to Run
1. Install dependencies and start the Node.js server:

```powershell
npm install
npm start
```

2. Open http://localhost:3000/ in your browser. The main app is served from `project-guide.html`.

API endpoints:
- `GET /api/solutions` — returns saved proposals.
- `POST /api/solutions` — submit a new proposal (JSON body with `title`, `author`, `summary`, `sources`, `tags`).

---

For development instructions, see `.github/copilot-instructions.md`.
