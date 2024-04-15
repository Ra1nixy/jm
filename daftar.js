// server.js
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

mongoose.connect('mongodb+srv://iamrainaldi:aldi2002@cluster0.r9j2o07.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { fullname, email, username, password } = req.body;
    const newUser = new User({ fullname, email, username, password });
    newUser.save()
        .then(() => res.status(201).json({ message: 'Pendaftaran berhasil' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
