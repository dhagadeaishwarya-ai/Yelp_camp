const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressErrors');
const { campgroundSchema, reviewSchema } = require('./schemas');
const joi = require('joi');


const campgroundsRoutes = require('./routes/campgrounds');
const reviewsRoutes = require('./routes/reviews');


mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(() => {
  console.log('MongoDB Connected');
})
.catch(err => {
  console.log('MongoDB Connection Error:', err);
}); 



const path = require('path');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/show/:id/reviews', reviewsRoutes);


app.get('/', (req, res) => {
  res.render('home');
});


app.use('/{*path}', (req, res) => {
  res.send('404!!');
});

app.use((err,req, res,next) => {
  const { status = 500} = err;
  if (!err.message) err.message = 'Something went wrong';
  res.status(status).render('campgrounds/errors', {err});
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});