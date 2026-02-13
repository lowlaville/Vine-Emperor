# Vine-Emperor

A lightweight chapter-reading web app with branching choices at the end of each chapter.

## Features

- Read one chapter at a time in a clean interface.
- Pick from branching choices to navigate different story outcomes.
- Browse a small in-app library, including the **Lightning God** story entry.
- Track your path in a "Path Taken" history panel.
- Restart at any ending to explore alternate branches.

## Run locally

Because this is a static app, you can open `index.html` directly or run a tiny local server:

```bash
python3 -m http.server 4173
```

Then visit <http://localhost:4173>.

## Project files

- `index.html` — app markup.
- `styles.css` — app styling.
- `script.js` — library/story data and branching logic.
