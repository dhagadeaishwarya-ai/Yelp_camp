const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');


mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(() => {
  console.log('MongoDB Connected');
})
.catch(err => {
  console.log('MongoDB Connection Error:', err);
}); 


const Campground = require('./models/campground');

const path = require('path');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.get('/', (req, res) => {
  res.render('home');
});

app.get('/makecampground', async (req, res) => {
  const camp = new Campground({ title: 'My Backyard', price: '0' });
  await camp.save();
  res.send(camp);
});

app.get('/campgrounds', async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
});

app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
});

app.post('/campgrounds', async (req, res) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`/campgrounds/show/${campground._id}`);
});

app.get('/campgrounds/show/:id', async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render('campgrounds/show', { campground });
});

app.get('/campgrounds/show/:id/edit', async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render('campgrounds/edit', { campground });
});

app.put('/campgrounds/show/:id', async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
  res.redirect(`/campgrounds/show/${campground._id}`);
});

app.delete('/campgrounds/show/:id', async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});