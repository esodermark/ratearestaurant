const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { ensureAuthenticated } = require('../public/config/auth');

// router.get('/', (req, res) => {
//     res.render('index', {title: '', description: '', comments: ''});
// });

// // select restaurants
// app.get('/', (req, res) => {
//     let sql = 'SELECT * FROM restaurants';
//     let query = db.query(sql, (err, results) => {
//         if(err) throw err;
//         console.log(results);
//         res.render('index', {results: results});
//     } );
// });

// select restaurants
router.get('/', (req, res) => {
    const comment = {
        
    }
    const option = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
    };
    fetch("http://localhost:5000/index", option)
            .then(r =>  r.json().then(data => ({status: r.status, body: data})))
            .then(function(data){
                renderData(data);
            });
    function renderData(data){
        res.render('unauth', {results: data.body});
    }
});

// select restaurants
router.get('/ratearestaurant', ensureAuthenticated, (req, res) => {
    const comment = {
        
    }
    const option = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
    };
    fetch("http://localhost:5000/index", option)
            .then(r =>  r.json().then(data => ({status: r.status, body: data})))
            .then(function(data){
                renderData(data);
            });
    function renderData(data){
        res.render('index', {results: data.body});
    }
});

// add restaurant
router.post('/addrestaurant', (req, res) => {
    const restaurant = {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location
    }
    const option = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(restaurant)
    };
    fetch("http://localhost:5000/addrestaurant", option)
    .then(response => {
        response.text().then(function(data) {
            if(data.status){
                res.redirect('/ratearestaurant');
            }else{ 
                res.redirect('/ratearestaurant');
            }
        });
    });
});

// edit restaurant
router.post('/edit/:id', (req, res) => {
    const restaurant = {
        restaurant_id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        location: req.body.location
    }
    const option = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(restaurant)
    };
    fetch("http://localhost:5000/editrestaurant", option)
            .then(r =>  r.text().then(data => ({status: r.status, body: data})))
            .then(function(data){
                renderData(data);
            });
    function renderData(data){
        res.redirect('/ratearestaurant');
    }
})

// delete restaurant
router.post('/delete/:id', (req, res) => {
    const restaurant = {
        restaurant_id: req.params.id
    }

    const option = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(restaurant)
    };
    fetch("http://localhost:5000/deleterestaurant", option)
            .then(r =>  r.json().then(data => ({status: r.status, body: data})))
            .then(function(data){
                renderData(data);
            });
    function renderData(data){
        res.redirect('/ratearestaurant');
    }
})

// get number of restaurants
router.post('/getNumRestaurants', (req, res) => {
    const comment = {
        
    }
    const option = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
    };
    fetch("http://localhost:5000/index", option)
            .then(r =>  r.json().then(data => ({status: r.status, body: data})))
            .then(function(data){
                sendData(data);
            });
    function sendData(data){
        res.send(data);
    }
});

// insert comment

module.exports = router;