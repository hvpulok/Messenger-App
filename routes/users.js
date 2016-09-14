var express             = require('express');
var router              = express.Router();
var passwordHash        = require('password-hash');

var User                = require('../models/user');

// definition of user post route to save signed up user
router.post('/', function (req, res, next) {
    // create a new user object with signed up user info
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: passwordHash.generate(req.body.password), //store hash of pwd
        email: req.body.email
    });

    // definition to store user object in dB
    user.save(function (err, result) {
        if(err){
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Saved User',
            obj: result
        });
    })
});

module.exports = router;