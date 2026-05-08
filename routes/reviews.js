const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressErrors');

const { reviewSchema } = require('../schemas');

const Review = require('../models/reviews');
const Campground = require('../models/campground');

const ValidateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

router.post('/', ValidateReview,catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  const review = new Review(req.body.review);
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  res.redirect(`/campgrounds/show/${campground._id}`);
}));

router.delete('/:reviewId', catchAsync(async (req, res) => {
const { id, reviewId } = req.params;
await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
await Review.findByIdAndDelete(reviewId);
res.redirect(`/campgrounds/show/${id}`);
}));

module.exports = router;