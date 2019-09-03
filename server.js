const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const coupon = require('./routes/api/coupon');
const dashboard = require('./routes/api/dashboard');
const order = require('./routes/api/order');
const products = require('./routes/api/products');
const reviews = require('./routes/api/reviews');
const subscriptions = require('./routes/api/subscriptions');
const users = require('./routes/api/users');
// const employs = require('./routes/api/employs');
// const cities = require('./routes/api/cities');
// const states = require('./routes/api/states');

const seeddb = require('./seedDb');
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;
// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  // seeddb();

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);


// Use Routes
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/dashboard', dashboard);
// app.use('/api/employs',employs);
app.use('/api/coupon',coupon);
app.use('/api/order',order);
app.use('/api/reviews',reviews);
app.use('/api/subbscriptions',subscriptions);

// app.use('/api/cities',cities);
// app.use('/api/states',states);






const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
