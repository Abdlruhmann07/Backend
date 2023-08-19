// inilaizing router from express
const express = require('express');
const router = express.Router();
// router requirements
const jwt = require('jsonwebtoken')
// Importing models
const User = require(`../models/user`)
// Importing helpers
const handleErrors = require('../helpers/handleErrors')

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'dodger secret dodger', {
        expiresIn: maxAge
    });
}

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

        res.status(200).json({ user: user._id, message: 'logged in successfully' })
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
})


router.get('/login', (req, res) => {
    res.render('login')
})

module.exports = router;