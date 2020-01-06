const express = require('express');
const path = require('path');
const port = 5000;
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
app.post('/addcomment/:id', (req, res) => {
    console.log(req.body.comment);
    let comment = { comment: req.body.comment, restaurant_id: req.params.id };
    let sql = 'INSERT INTO reviews SET ?';
    let query = db.query(sql, comment, (err, result) => {
        if(err) throw err;
        res.send(result);
    } );
});

//add comment
app.post('/test', (req, res, next) => {
    console.log(req.body);
    let comment = { comment: req.body.comment, restaurant_id: req.body.restaurant_id };
    let sql = 'INSERT INTO reviews SET ?';
    let query = db.query(sql, comment, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
});

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
    console.log(restaurant_id);
    let sql = `SELECT * FROM reviews JOIN restaurants ON restaurants.id=reviews.restaurant_id WHERE restaurants.id = ${restaurant_id} `;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    } );
})




app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log(`listening on port ${port}!`));