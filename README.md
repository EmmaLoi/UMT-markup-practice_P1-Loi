# Flora

Responsive flower shop landing page with interactive UI and dynamic content loading.

## Features

- Responsive layout
- Retina-ready images
- Product Details modal
- Order modal
- Dynamic content rendering
- Axios HTTP requests
- Async/await
- Load More pagination
- Loading, empty and error states

## Technologies

- HTML5
- CSS3
- JavaScript
- Axios

## API

The project uses the deployed Flora backend API for bouquets and feedback:

```text
https://flora-backend-eao9.onrender.com/api
```

Backend endpoints:

```text
/api/bouquets
/api/feedback
```

Top Selling Bouquets are loaded from the local `db.json` file.

JSON Server is not required.

## Running the project

Open the live page on GitHub Pages.

For local development, open `index.html` with Live Server.

## Project structure

```text
├── css/
├── images/
├── js/
│   ├── api.js
│   └── main.js
├── db.json
├── index.html
├── package.json
└── README.md
```

## Implemented functionality

- Bouquets are loaded from the backend API.
- Feedback is loaded from the backend API.
- Top Selling Bouquets are loaded from local `db.json`.
- Product cards are rendered dynamically.
- Product details modal works for bouquet items.
- Order modal works with semantic form fields.
- Load More pagination is implemented for bouquets.