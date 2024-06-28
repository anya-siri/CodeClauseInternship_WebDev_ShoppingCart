# Shopping Website

A dynamic shopping website built using HTML, CSS and JavaScript. (Browse products, view description, cart functionality and track of total amount)

## Frontend Technologies

- **HTML**: The markup language used to structure the web pages.
- **CSS**: The style sheet language used to define the visual presentation of the web pages.
- **JavaScript**: The programming language used to create interactive and dynamic web content.
- **Fetch API**: Used to make asynchronous HTTP requests to fetch data from the fake store API.
- **LocalStorage**: Used to store the shopping cart data persistently on the client-side.

## Backend (External API)

- **Fake Store API**: A public API used to provide product data for the shopping website.

## Other Concepts and Tools

- **DOM Manipulation**: JavaScript methods and techniques used to dynamically update the content and structure of the web pages.
- **Event Handling**: JavaScript functions to handle user interactions like clicking buttons and changing input fields.
- **Pagination**: Logic implemented in JavaScript to divide the product list into pages and allow navigation between them.
- **Filtering**: Logic implemented in JavaScript to filter products based on category and search query.
- **Local Storage**: Browser-based storage to save the state of the shopping cart.

## Code Breakdown

### Fetching Data from API

- **Fetch API** is used to get product data and categories from the fake store API.
- `fetchProducts()` and `fetchCategories()` functions handle these requests.

### DOM Manipulation and Rendering

- **JavaScript** is used to dynamically create and insert HTML elements into the DOM.
- The `displayProducts()` function generates the product listings based on the current page and filters.

### Filtering and Pagination

- **JavaScript** is used to filter products based on category and search input (`filterProducts()` function).
- The `paginateProducts()` function slices the product array to show a specific number of products per page.
- Pagination controls are managed by `changePage()` and `updatePagination()` functions.

### Local Storage and Cart Management

- **LocalStorage** is used to persist the cart items across page reloads.
- The `addToCart()` function adds products to the cart and updates the button state immediately.

### Prerequisites

- Web browser (Google Chrome, Mozilla Firefox, etc.)
- Code editor (VSCode, Sublime Text, etc.)
