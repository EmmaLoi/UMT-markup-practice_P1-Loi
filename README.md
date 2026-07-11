# Flora

Responsive flower shop landing page with interactive UI and dynamic content loading from the Flora backend API.

## Features

- Responsive layout
- Retina-ready images
- Dynamic bouquets rendering
- Top Selling slider with responsive pagination
- Feedback slider with responsive pagination
- Product Details modal
- Order modal
- Order creation through the backend API
- Load More pagination
- Loading, empty, and error states

## Technologies

- HTML5
- CSS3
- JavaScript
- Axios

## API

The project uses the deployed Flora backend API:

```text
https://flora-backend-eao9.onrender.com/api
```

Available endpoints used by the frontend:

```text
/api/bouquets
/api/bestsellers
/api/feedback
/api/orders
```

## Running the project

Open the live page on GitHub Pages:

```text
https://emmaloi.github.io/UMT-markup-practice_P1-Loi/
```

For local development, open `index.html` with Live Server.

The backend must be available locally or through the deployed Render URL configured in `js/api.js`.

## Project structure

```text
├── css/
├── images/
├── js/
│   ├── api.js
│   └── main.js
├── index.html
├── package.json
└── README.md
```

## Implemented functionality

- Bouquets are loaded from the backend API.
- Top Selling Bouquets are loaded from the backend API.
- Feedback is loaded from the backend API.
- Orders are sent to the backend API.
- Product cards are rendered dynamically.
- Product details modal works for bouquets and bestsellers.
- Responsive pagination works for Top Selling and Feedback.
- Load More pagination works for the bouquet catalog.