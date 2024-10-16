const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

let users = [
    {username: 'Dennis', password: 'so', key: 1},
    {username: 'jay', password: 'dic', key: 2},
    {username: 'karl', password: 'bayot', key: 3},
    {username: 'sample', password: 'hello123!', key: 4},
    {username: 'hello', password: 'world', key: 5}
];

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors());
app.use(express.urlencoded({extended: false}));

// Sample route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Get users
app.get('/users', (req, res) => {
    res.send(users);
});

// Post a new user
app.post('/users', (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).send({ message: 'Username and password are required.' });
    }

    // Check for duplicate usernames
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).send({ message: 'Username already exists.' });
    }

    // Create a new user object
    const newUser = {
        username,
        password,
        key: users.length + 1 // Assign a new key based on the current length of the array
    };

    // Add the new user to the users array
    users.push(newUser);

    // Respond with the newly created user
    res.status(201).send(newUser);
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});