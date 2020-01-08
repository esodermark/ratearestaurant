const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// user model
const User = require('../public/models/User');

// login page
router.get('/login', (req, res) => res.render('login'));

// register page
router.get('/register', (req, res) => res.render('register'));

// register handle
router.post('/register', (req, res) => {
    console.log(req.body)
    const {email, password, password2} = req.body;
    let errors = [];

    // check required fields
    if(!email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields'});
    } else {
        // validation passed
        User.findOne({ email: email })
            .then(user => {
                if(user) {
                    // user exists
                    errors.push({ msg: 'Email is already registered' });
                    res.render('register', {
                        errors,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        email,
                        password
                    });

                    // hash password
                    bcrypt.genSalt(10, (error, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        // set password to hashed
                        newUser.password = hash;
                        // save user
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered and can log in');
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));

                    }));
                }
            });
    }
});

// login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/ratearestaurant',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// logout handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;