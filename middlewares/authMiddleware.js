const jwt = require('jsonwebtoken');
const User = require('../models/user')
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;


    //check json web token exists , is verfired?
    if (token) {
        jwt.verify(token, 'dodger secret dodger', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.json({ error: 'please login first' })
                res.redirect('/login')
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/login')
    }
}

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'dodger secret dodger', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let Currentuser = await User.findById(decodedToken.id);
                res.locals.user = Currentuser;

                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }

}
module.exports = { requireAuth, checkUser };