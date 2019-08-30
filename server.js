const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const news = require('./routes/api/news');
const employs = require('./routes/api/employs');
const categories = require('./routes/api/categories');
// const cities = require('./routes/api/cities');
// const states = require('./routes/api/states');
const dashboard = require('./routes/api/dashboard');

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
app.use('/api/news', news);
app.use('/api/dashboard', dashboard);
app.use('/api/employs',employs);
app.use('/api/categories',categories);
// app.use('/api/cities',cities);
// app.use('/api/states',states);






const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
