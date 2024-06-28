document.addEventListener('DOMContentLoaded', () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    }
});

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItemsContainer.innerHTML = `
        <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
        </tr>
    `;
    let totalPrice = 0;
    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        const cartItem = document.createElement('tr');
        cartItem.innerHTML = `
            <td><img src="${item.image}" alt="${item.title}"></td>
            <td>${item.title}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
            </td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button onclick="removeFromCart(${index})">Remove</button></td>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}
