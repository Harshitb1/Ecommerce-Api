
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const middleware = require("../../middleware/index");


// Load User model
const Employ = require('../../models/Employ');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Employ Works' }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register',async (req, res) => {
  var errors={};
    await Employ.findOne({ email: req.body.email }).then(employ => {
        if (employ) {
          errors.email = 'Email already exists';
          return res.status(400).json(errors);
    }});
    
    // console.log(req.body.password);

          const newEmploy = new Employ({
            
            name: req.body.name,
            password: req.body.password,            
            email: req.body.email.toLowerCase(),
            gender: req.body.gender,
            phone: req.body.phone,
            state: req.body.state,
            city: req.body.city,
            salary: req.body.salary
          });
    
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newEmploy.password, salt, (err, hash) => {
            //   if (err) throw err;
              newEmploy.password = hash;
              newEmploy
                .save()
                .then(employ => res.json(employ))
                .catch(err =>{ errors.password= "something went wrong , please try again"; res.status(400).json(errors)});
            });
          });   
});



// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login',(req, res) => {
  // const { errors, isValid } = validateLoginInput(req.body);

  var errors={};
  // Check Validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  // Find user by email
  Employ.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'Employ not found';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, phone:user.phone, isSuper: user.isSuper }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  middleware.checkToken,
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone
    });
  }
);


// @route   GET api/users/all
// @desc    Return all user
// @access  Private

router.get('/all',middleware.checkToken, (req, res) => {
  Employ.find()
    .sort({ date: -1 })
    
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ noemploysfound: 'No Employs found' }));
});




// @route   GET api/employ/:id
// @desc    Get employ by id
// @access  Public
router.get('/:id', (req, res) => {
  Employ.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err =>
      res.status(404).json({ noemployfound: 'No employ found with that ID' })
    );
});

module.exports = router;


// token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMmY4NWIyN2Q1Y2RjMzU4ODU5NWM3YSIsIm5hbWUiOiJIYXJzaGl0IEJhdHJhIiwicGhvbmUiOjk3MTY4MjIxMDgsImlhdCI6MTU2MzM5NTUzOCwiZXhwIjoxNTYzMzk5MTM4fQ.b0DqGZ5hwkiCpA4Z5-AaCGaixPFP8ABsWu-oGKJMs3A"