const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.use(express.json());

// POST /bfhl
app.post('/bfhl', (req, res) => {
    const data = req.body.data;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: 'Invalid input, expected an array of data'
        });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.sort().slice(-1);

    res.json({
        is_success: true,
        user_id: 'your_name_ddmmyyyy',
        email: 'your_email@domain.com',
        roll_number: 'your_roll_number',
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    });
});

// GET /bfhl
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

// Export the app as a serverless function
module.exports.handler = serverless(app);
