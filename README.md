# Roast & Root Coffee Co.

A responsive multi-page static website for a small-batch specialty coffee roastery based in India.

## Overview

Roast & Root Coffee Co. showcases a curated selection of single-origin coffees, farm stories, brewing guides, and roastery details. The site is built with plain HTML, CSS, and JavaScript, making it easy to run locally without a build step or framework.

## Pages

- Home (`index.html`)
- About (`about.html`)
- Coffee (`coffee.html`)
- Origins (`origins.html`)
- Brewing (`brewing.html`)
- Journal (`journal.html`)
- Contact (`contact.html`)

## Project Structure

```text
roast-and-root/
├── about.html
├── brewing.html
├── coffee.html
├── contact.html
├── index.html
├── journal.html
├── origins.html
├── css/
│   └── style.css
├── images/
│   └── ...
├── js/
│   └── script.js
└── README.md
```

## Run locally

You can open `index.html` directly in a browser, or serve the site locally with a simple static HTTP server:

```bash
cd roast-and-root
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Notes

- This is a static brochure-style website.
- Styling is handled in `css/style.css`.
- Interactivity and animations are managed in `js/script.js`.
- Images are stored in the `images/` folder.

## License

This project is intended for educational and portfolio/demo use unless otherwise specified by the owner.
