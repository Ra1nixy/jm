const product = document.querySelectorAll('.product');
const cartItems = document.querySelector('.cart-items');
const total = document.querySelector('.total');
const checkoutButton = document.querySelector('.checkout');

let cart = [];
const searchButton = document.getElementById('search-button');
const sortBySelect = document.getElementById('sort-by');
const sortDirectionButton = document.getElementById('sort-direction');

let sortDirection = 'asc';

// Menambah produk ke keranjang
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    renderCart();
}

// Menghapus produk dari keranjang
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

// Render keranjang belanja
function renderCart() {
    cartItems.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.quantity}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Hapus';
        removeButton.addEventListener('click', () => removeFromCart(item.id));
        li.appendChild(removeButton);
        cartItems.appendChild(li);
        totalPrice += item.price * item.quantity;
    });
    total.textContent = `Total: Rp${totalPrice}`;
}

// Checkout
checkoutButton.addEventListener('click', () => {
    alert('Total belanja Anda: Rp' + total.textContent.split('Rp')[1]);
    cart = [];
    renderCart();
});

// Tambah event listener untuk tombol tambah ke keranjang
product.forEach(product => {
    const addToCartButton = product.querySelector('.add-to-cart');
    const id = product.getAttribute('data-id');
    const name = product.getAttribute('data-name');
    const price = parseInt(product.getAttribute('data-price'));
    addToCartButton.addEventListener('click', () => addToCart(id, name, price));
});
// Checkout
checkoutButton.addEventListener('click', () => {
    if (cart.length > 0) {
        const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const confirmation = confirm(`Total belanja Anda: Rp${totalPrice}\nApakah Anda ingin melanjutkan ke pembayaran?`);
        if (confirmation) {
            alert('Pembayaran berhasil!');
            cart = [];
            renderCart();
        } else {
            alert('Pembayaran dibatalkan.');
        }
    } else {
        alert('Keranjang belanja Anda kosong.');
    }
});
const searchInput = document.getElementById('search');
const filterSelect = document.getElementById('filter');

// Filter products based on search input and filter selection
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value;

    const filteredProducts = products.filter(product => {
        const nameMatches = product.name.toLowerCase().includes(searchTerm);
        const filterMatches = filterValue === 'all' || product.type === filterValue;
        return nameMatches && filterMatches;
    });

    renderProducts(filteredProducts);
}

// Render filtered products
function renderProducts(filteredProducts) {
    const productsSection = document.querySelector('.products');
    productsSection.innerHTML = '';

    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Harga: Rp${product.price}</p>
            <button class="add-to-cart">Tambah ke Keranjang</button>
        `;
        productsSection.appendChild(productDiv);
    });
}

// Event listeners for search and filter
searchInput.addEventListener('input', filterProducts);
filterSelect.addEventListener('change', filterProducts);
const products = [
    { id: 1, name: 'Jam Tangan Klasik', type: 'klasik', price: 500000, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Jam Tangan Digital', type: 'digital', price: 300000, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Jam Tangan Sporty', type: 'sporty', price: 700000, image: 'https://via.placeholder.com/150' }
];


// Filter products based on search input and filter selection
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value;

    const filteredProducts = products.filter(product => {
        const nameMatches = product.name.toLowerCase().includes(searchTerm);
        const filterMatches = filterValue === 'all' || product.type === filterValue;
        return nameMatches && filterMatches;
    });

    return filteredProducts;
}

// Sort products based on sort by and sort direction
function sortProducts(filteredProducts) {
    const sortByValue = sortBySelect.value;

    filteredProducts.sort((a, b) => {
        const aValue = typeof a[sortByValue] === 'string' ? a[sortByValue].toLowerCase() : a[sortByValue];
        const bValue = typeof b[sortByValue] === 'string' ? b[sortByValue].toLowerCase() : b[sortByValue];

        if (sortDirection === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    return filteredProducts;
}

// Render products
function renderProducts(products) {
    const productsSection = document.querySelector('.products');
    productsSection.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Harga: Rp${product.price}</p>
            <button class="add-to-cart">Tambah ke Keranjang</button>
        `;
        productsSection.appendChild(productDiv);
    });
}

// Event listeners for search, filter, and sort
searchButton.addEventListener('click', () => {
    const filteredProducts = filterProducts();
    const sortedProducts = sortProducts(filteredProducts);
    renderProducts(sortedProducts);
});

sortBySelect
// Checkout with Dana
checkoutButton.addEventListener('click', () => {
    if (cart.length > 0) {
        const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const danaNumber = document.getElementById('dana-number').value.trim();

        if (danaNumber !== '') {
            alert(`Pembayaran berhasil dengan nomor Dana: ${danaNumber}\nTotal belanja Anda: Rp${totalPrice}`);
            cart = [];
            renderCart();
        } else {
            alert('Silakan masukkan nomor Dana.');
        }
    } else {
        alert('Keranjang belanja Anda kosong.');
    }
});
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Kirim data login ke backend (belum diimplementasikan)
    // Contoh validasi sederhana
    if (username === 'admin' && password === 'password') {
        // Redirect ke halaman setelah login sukses
        window.location.href = 'web.html';
    } else {
        errorMessage.innerText = 'Username atau password salah.';
    }
});
