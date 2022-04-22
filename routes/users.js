var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userModel = require('./models/userModel');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'add user'
  });
});

router.post('/add-user', function (req, res, next) {

  req.assert('name', 'Name is required').notEmpty() //Validate name
  req.assert('email', 'A valid email is required').isEmail() //Validate email
  req.assert('phoneNo', 'Phone Number is required').notEmpty()
  req.assert('city', 'City is required').notEmpty()
  req.assert('address', 'Address is required').notEmpty()

  var errors = req.validationErrors()

  if (!errors) { 
    //No errors were found.  Passed Validation!
    var userDetails = new userModel({
      name: req.body.name,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
      city: req.body.city,
      address: req.body.address
    });

    userDetails.save((err, doc) => {
      if (!err)
        req.flash('success', 'User added successfully!');
      res.redirect('/');
      // else
      //     console.log('Error during record insertion : ' + err);
    });

  } else {
    //Display errors to user
    var error_msg = ''
    errors.forEach(function (error) {
      error_msg += error.msg + '<br>'
    })
    req.flash('error', error_msg)

    res.render('/', {
      title: 'Add New User',
      name: req.body.name,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
      city: req.body.city,
      address: req.body.address
    })
  }
});

module.exports = router;