const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const mysql = require('mysql');
const expressLayouts = require('express-ejs-layouts')
const app = express();
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport'); 

// create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'restaurant'
});

// connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected ...')
})

// passport config
require('../client/public/config/passport')(passport);

// ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// mongoose
mongoose.connect('mongodb://localhost/restaurant', {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log('Connected to database'))
.catch(err => console.log(`Failed to connect to database - Error: ${err.message}`));

// create db
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE restaurant';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('database created ...');
    })
});

//add comment
// app.post('/addcomment/:id', (req, res) => {
//     console.log(req.body.comment);
//     let comment = { comment: req.body.comment, restaurant_id: req.params.id };
//     let sql = 'INSERT INTO reviews SET ?';
//     let query = db.query(sql, comment, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.redirect(`/reviews/${req.params.id}`);
//     } );
// });


// insert restaurant
// app.get('/addrestaurant', (req, res) => {
//     let restaurants = {title: 'Pizzeria Angelo', description: 'This is Pizzeria Angelo', comments: 'This is superb'};
//     let sql = 'INSERT INTO restaurants SET ?';
//     let query = db.query(sql, restaurants, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('Restaurant added ...');
//     } );
// });

// update restaurant
app.get('/updaterestaurant', (req, res) => {
    let restaurants = {title: 'Pizzeria Mazzimo', description: 'This is Pizzeria Massimo'};
    let sql = "UPDATE restaurants SET title = 'Pizzeria Crudo' WHERE title = 'Pizzeria Mazzimo'";
    let query = db.query(sql, restaurants, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Restaurant updated...');
    } );
});

// // select restaurants
// app.get('/getrestaurants', (req, res) => {
//     let sql = 'SELECT * FROM restaurants';
//     let query = db.query(sql, (err, results) => {
//         if(err) throw err;
//         console.log(results);
//         res.render('index', {results: results});
//     } );
// });

// // select reviews
// app.get('/getreviews', (req, res) => {
//     let sql = 'SELECT * FROM reviews WHERE restaurant_id = 4';
//     let query = db.query(sql, (err, results) => {
//         if(err) throw err;
//         console.log(results);
//         res.render('index', {title: '', description: '', comments: results, results: results}); // use foreach inside template
//     } );
// });

// // join restaurants and reviews
// app.get('/getfull', (req, res) => {
//     let sql = 'SELECT * FROM restaurants JOIN reviews ON restaurants.id = reviews.restaurant_id';
//     let query = db.query(sql, (err, results) => {
//         if(err) throw err;
//         console.log(results);
//         res.render('index', {results: results, title: results[0].title, description: results[0].description, comments: ''}); // use foreach inside template
//     } );
// });

// view engine set up
// console.log(path.join(__dirname, 'views'));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// import client routes
const IndexRouter = require('../client/routes/index');
const ReviewsRouter = require('../client/routes/reviews');
const UsersRouter = require('../client/routes/users');

// setting client to use routes
app.use('/', IndexRouter);
app.use('/', ReviewsRouter);
app.use('/users', UsersRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`listening on port ${PORT}!`));