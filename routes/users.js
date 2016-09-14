var express             = require('express');
var router              = express.Router();
var passwordHash        = require('password-hash');
var jwt                 = require('jsonwebtoken');

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

// definition of user signin route
router.post('/signin', function (req, res, next) {
    User.findOne({email : req.body.email}, function(err, doc){
        if(err){
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!doc){
            return res.status(404).json({
                title: 'No user found',
                error: {message: 'User could not be found'}
            });
        }

        if(!passwordHash.verify(req.body.password, doc.password)){
            return res.status(404).json({
                title: 'Could not sign you in',
                error: {message : 'Invalid password'}
            });
        }

        var token = jwt.sign({user: doc}, '@secret!', {expiresIn: 7200});
        res.status(200).json({
            message: 'Success',
            token: token,
            userId: doc._id
        });
    });
});

module.exports = router;