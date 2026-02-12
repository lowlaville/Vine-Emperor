# Veil Web App

A vanilla HTML/CSS/JS mythic story reader with a library homepage, story details, and chapter reading views.

## Views

- **Homepage / Library**: shows app title, tagline, and a grid of story cards.
- **Story Detail**: shows full story description and chapter list.
- **Chapter Reader**: shows chapter text and 2–3 choices.

## Choice behavior

Choices currently do not branch. Clicking a choice saves it to `localStorage` under the key `veilChoices` and shows a confirmation message.

## Run locally

```bash
python3 -m http.server 4173
```

Open <http://localhost:4173>.

## Files

- `index.html` – semantic layout and view containers.
- `styles.css` – mythic dark theme, gold accents, responsive styles, and focus states.
- `script.js` – single source of truth for story/chapter data and view logic.
- `README.md` – usage and project overview.
