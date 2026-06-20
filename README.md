# Flora

Responsive flower shop landing page with interactive UI and dynamic content loading.

## Features

- Responsive layout (mobile, tablet, desktop)
- Retina-ready images (`srcset`, @2x images)
- Adaptive background images with `min-resolution`
- Product Details modal
- Order modal with semantic form
- Dynamic content rendering from API
- Axios HTTP requests
- Async/await
- JSON Server mock API
- Load More pagination
- Loading, empty and error states

## Technologies

- HTML5
- CSS3
- JavaScript
- Axios
- JSON Server

## Installation

Clone the repository:

```bash
git clone https://github.com/EmmaLoi/UMT-markup-practice_P1-Loi.git
```

Open project folder:

```bash
cd UMT-markup-practice_P1-Loi
```

Install dependencies:

```bash
npm install
```

## Mock API

This project uses JSON Server as a mock backend.

Start JSON Server:

```bash
npm run server
```

API URL:

```text
http://localhost:3000
```

Available endpoints:

```text
/bestsellers
/bouquets
/feedback
```

## Running the project

Open the live page on GitHub Pages.

To see dynamic content (bouquets, bestsellers, feedback), JSON Server must be running locally:

```bash
npm run server
```

## Project structure

```text
├── css/
│
├── images/
│
├── js/
│   ├── api.js
│   └── main.js
│
├── db.json
├── index.html
├── package.json
└── README.md
```

## Implemented functionality

### Retina images

- Content images use `srcset` with x1/x2 versions.
- Background images use media queries with `min-resolution`.
- Mobile-first responsive approach is preserved.

### Modals and forms

- Product Details modal.
- Order modal.
- Backdrop overlay.
- Opening and closing with `is-open` class.
- Closing by button and backdrop click.
- Body scroll lock when modal is open.
- Form fields include labels, names, placeholders and submit buttons.

### API and dynamic markup

- Data is loaded from JSON Server.
- HTTP requests are made using Axios.
- Async/await syntax is used.
- Error handling is implemented.
- Lists are generated dynamically:
  - Bestsellers
  - Bouquets
  - Feedback
- Rendering uses template strings and `insertAdjacentHTML`.

### Pagination

- Bouquets are loaded by pages.
- Load More button requests additional items.
- Current page and limit are stored in application state.
- Items are added without duplication.
- End of collection state is handled.

## Author

Created as part of HTML/CSS/JavaScript practice project.