const apiEndpoint = 'https://fakestoreapi.com/products';
const productsPerPage = 8;
let currentPage = 1;
let totalPages = 1;
let allProducts = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

async function fetchProducts() {
    try {
        const response = await fetch(apiEndpoint);
        const products = await response.json();
        allProducts = products;
        totalPages = Math.ceil(products.length / productsPerPage);
        displayProducts();
        fetchCategories();
        updatePagination();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    const filteredProducts = filterProducts();
    totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginatedProducts = paginateProducts(filteredProducts);

    paginatedProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>$${product.price.toFixed(2)}</p>
            <button id="add-to-cart-${product.id}" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Add to Cart</button>
        `;
        productsContainer.appendChild(productDiv);

        
        updateCartButtonState(product.id);
    });

    updatePagination();
}

function updateCartButtonState(productId) {
    const button = document.getElementById(`add-to-cart-${productId}`);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        button.textContent = 'Added to Cart';
        button.classList.add('added');
        button.disabled = true;
    } else {
        button.textContent = 'Add to Cart';
        button.classList.remove('added');
        button.disabled = false;
    }
}

function paginateProducts(products) {
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    return products.slice(start, end);
}

function filterProducts() {
    const category = document.getElementById('category').value;
    const searchQuery = document.getElementById('search').value.toLowerCase();

    return allProducts.filter(product => {
        const matchesCategory = category === 'all' || product.category === category;
        const matchesSearch = product.title.toLowerCase().includes(searchQuery) || product.description.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });
}

function changePage(increment) {
    currentPage += increment;
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;
    displayProducts();
    updatePagination();
}

function updatePagination() {
    document.getElementById('currentPage').textContent = currentPage;
    document.getElementById('totalPages').textContent = totalPages;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
}

async function fetchCategories() {
    try {
        const response = await fetch(`${apiEndpoint}/categories`);
        const categories = await response.json();
        const categorySelect = document.getElementById('category');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

function addToCart(id, title, price, image) {
    const existingProduct = cart.find(item => item.id === id);
    if (!existingProduct) {
        const product = { id, title, price, image, quantity: 1 };
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();

       
        updateCartButtonState(id);
    }
}

function updateCart() {
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    document.getElementById('search').addEventListener('input', displayProducts);
    document.getElementById('category').addEventListener('change', displayProducts);
});
