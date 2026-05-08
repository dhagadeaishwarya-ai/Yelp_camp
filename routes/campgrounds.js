const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressErrors');
const Campground = require('../models/campground');
const { campgroundSchema, reviewSchema } = require('../schemas');


const ValidateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

router.get('/makecampground', async (req, res) => {
  const camp = new Campground({ title: 'My Backyard', price: '0' });
  await camp.save();
  res.send(camp);
});

router.get('/', async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
});

router.get('/new', (req, res) => {
  res.render('campgrounds/new');
});

router.post('/', catchAsync(async (req, res, next) => {
  const campground = new Campground(req.body.campground);
     await campground.save();
     res.redirect(`/campgrounds/show/${campground._id}`);
  
}));



router.get('/show/:id', ValidateCampground, catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id).populate('reviews');
  res.render('campgrounds/show', { campground });
}));

router.get('/show/:id/edit', ValidateCampground, catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render('campgrounds/edit', { campground });
}));

router.put('/show/:id', ValidateCampground, catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
  res.redirect(`/campgrounds/show/${campground._id}`);
}));

router.delete('/show/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds');
}));


module.exports = router;