// Variables para el carrito
let cart = [];

// Actualizar la visualización del carrito en la página
function renderCart() {
    const cartContainer = document.querySelector('.cart-container');
    const cartSummary = document.querySelector('.cart-summary h3');
    cartContainer.innerHTML = '';

    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
        cartSummary.textContent = 'Total: $0.00';
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>Cantidad: <input type="number" value="${item.quantity}" min="1" data-index="${index}" onchange="updateQuantity(event)"></p>
                <p>Precio: $${item.price.toFixed(2)}</p>
                <button class="btn" onclick="removeFromCart(${index})">Eliminar</button>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    cartSummary.textContent = `Total: $${total.toFixed(2)}`;
}

// Agregar un producto al carrito
function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1, image });
    }
    renderCart();
    alert('Producto añadido al carrito');
}

// Actualizar la cantidad de un artículo en el carrito
function updateQuantity(event) {
    const index = event.target.dataset.index;
    const newQuantity = parseInt(event.target.value);
    if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
        renderCart();
    }
}

// Eliminar un artículo del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

// Gestión del seguimiento de pedidos
function trackOrder() {
    const orderNumber = document.getElementById('order-number').value;
    const orderStatus = document.querySelector('.order-status');
    
    // Simulación de búsqueda de pedidos
    const orders = {
        "1234": "Procesando",
        "5678": "En camino",
        "91011": "Entregado"
    };

    if (orders[orderNumber]) {
        orderStatus.innerHTML = `<h2>Estado Actual: ${orders[orderNumber]}</h2>`;
    } else {
        orderStatus.innerHTML = `<h2>No se encontró ningún pedido con ese número.</h2>`;
    }
}

// Actualizar perfil de usuario
function updateProfile(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    alert(`Perfil actualizado con éxito:\nNombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone}`);
}
