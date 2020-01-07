const express = require('express');
const path = require('path');
const port = process.env.port || 5000;
const mysql = require('mysql');
const app = express();


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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//add comment
app.post('/test', (req, res, next) => {
    console.log(req.body);
    let review = { comment: req.body.comment, restaurant_id: req.body.restaurant_id, rating: req.body.rating };
    let sql = 'INSERT INTO reviews SET ?';
    let query = db.query(sql, review, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
});

// add restaurant
app.post('/addrestaurant', (req, res) => {
    let restaurant = {title: req.body.title, description: req.body.description, location: req.body.location, img: "/img/default.svg"};
    let sql = 'INSERT INTO restaurants SET ?';
    let query = db.query(sql, restaurant, (err, result) => {
        if(err) throw err;
        res.send('restaurant added');
        console.log('restaurant added');
    });
});

// edit restaurant from id
app.post('/editrestaurant', (req, res) => {
    let restaurant = {restaurant_id: req.body.restaurant_id, title: req.body.title, description: req.body.description, location: req.body.location};
    let sql = `UPDATE restaurants SET title = '${restaurant.title}', description = '${restaurant.description}', location = '${restaurant.location}' WHERE restaurants.id = ${restaurant.restaurant_id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send('restaurant updated');
        console.log('restaurant updated');
    });
});

// delete restaurant from id
app.post('/deleterestaurant', (req, res) => {
    let restaurant_id = req.body.restaurant_id;
    let sql = `DELETE FROM restaurants WHERE id = ${restaurant_id}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
})


// select restaurants
app.post('/index', (req, res) => {
    let sql = 'SELECT * FROM restaurants';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results);
    })
});

// get reviews from id
app.post('/getreviews', (req, res) => {
    let restaurant_id = req.body.restaurant_id;
    let sql = `SELECT * FROM reviews JOIN restaurants ON restaurants.id=reviews.restaurant_id WHERE restaurants.id = ${restaurant_id} `;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
})




app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log(`listening on port ${port}!`));