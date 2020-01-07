const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// // get reviews for id
// app.get('/:id', (req, res) => {
//     let sql = `SELECT * FROM reviews JOIN restaurants ON restaurants.id=reviews.restaurant_id WHERE restaurants.id = ${req.params.id} `;
//     let query = db.query(sql, (err, results) => {
//         if(err) throw err;
//         console.log(results);
//         res.render('reviews', {results: results, url: req.params.id, img: results[0].img}); // use foreach inside template
//     } );
// })
// get reviews for id


// add comment
router.post('/reviews/addcomment/:id', (req, res) => {
    const comment = {
        comment: req.body.comment,
        rating: req.body.rating,
        restaurant_id: req.params.id
    }

    const option = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
    };
    fetch("http://localhost:5000/test", option)
            .then(r =>  r.json().then(data => ({status: r.status, body: data})))
            .then(function(data){
                renderData(data);
            });
    function renderData(data){
        res.redirect(`/reviews/${req.params.id}`);
    }
});

router.get('/reviews/:id', (req, res) => {
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
    fetch("http://localhost:5000/getreviews", option)
            .then(r =>  r.json().then(data => ({status: r.status, body: data})))
            .then(function(data){
                renderData(data);
            });
    function renderData(data){
        res.render('reviews', {results: data.body, url: req.params.id});
    }
})

module.exports = router;