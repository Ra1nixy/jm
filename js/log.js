const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Kirim data login ke backend (belum diimplementasikan)
    // Contoh validasi sederhana
    if (username === 'admin' && password === '1234') {
        // Redirect ke halaman setelah login sukses
        window.location.href = 'web.html';
    } else {
        errorMessage.innerText = 'Username atau password salah.';
    }
    if (username === 'user' && password === '1234') {
        // Redirect ke halaman setelah login sukses
        window.location.href = 'web1.html';
    } else {
        errorMessage.innerText = 'Username atau password salah.';
    }
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Contoh data pengguna (untuk keperluan demonstrasi, sebaiknya disimpan di database)
const users = [
    { id: 1, username: 'admin', password: 'password' }
];

// Endpoint untuk login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validasi login
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.status(200).json({ message: 'Login berhasil' });
    } else {
        res.status(401).json({ message: 'Username atau password salah' });
    }
});

app.listen(3000, () => {
    console.log('Server berjalan di port 3000');
});
