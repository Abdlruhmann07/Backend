// inilaizing router from express
const express = require('express');
const router = express.Router();

// router requirements
const jwt = require('jsonwebtoken')
// Importing models
const User = require(`../models/user`)

// middlewares


// Error handling and validation messages
const handleErrors = (err) => {
    let errors = { email: '', password: '' }
    console.log(err.message, err.code);

    //Unique email error handling
    if (err.code === 11000) {
        errors.email = 'That email is already registered'
        return errors;
    }

    // validation errors
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            console.log(properties);
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

// Generate web tokens function 
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'dodger secret dodger', {
        expiresIn: maxAge
    });
}

//Routes
// Register Route handling
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    // creating new user
    try {
        let newUser = await User.create({
            username: username,
            email: email,
            password: password,
        });
        const token = createToken(newUser._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(400).json(newUser._id)

    } catch (err) {
        const Errors = handleErrors(err);
        res.status(400).json({ Errors });
    }
})

// Get signup page
router.get('/signup', (req, res) => {
    res.render('signup')
})


module.exports = router;