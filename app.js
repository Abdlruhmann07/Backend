require('dotenv').config();
// Server requiremetns
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser')
const PORT = process.env.PORT
const app = express();
// Importing modules
// Importing Routes
const userRoutes = require('./routes/user')
const signupRoutes = require('./routes/signup')
const loginRoutes = require('./routes/login')
const logoutRoutes = require('./routes/logout')
const productRoutes = require('./routes/products')
// Using important middlewares
const { requireAuth, checkUser } = require('./middlewares/authMiddleware')

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());
//
app.set('view engine', 'ejs');

// Using Routes
app.use(signupRoutes);
app.use(loginRoutes);
app.use(logoutRoutes);
app.use(productRoutes);
app.use(userRoutes);

// Database connect
mongoose.connect(`mongodb+srv://${process.env.Database_username}:${process.env.Database_Passwrod}@cluster0.dgihmg1.mongodb.net/ecommerce-website`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,


}).then(() => {
    console.log("Database connected");
}).catch(err => {
    console.log(err);
})

// test route (delete me)
app.get('*', checkUser);
app.get('/testAuth', requireAuth, (req, res) => {
    res.render('testAuth')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

