const mongoose = require('mongoose');
const city = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(() => {
  console.log('MongoDB Connected');
})
.catch(err => {
  console.log('MongoDB Connection Error:', err);
}); 

const sample = array =>array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
        location: `${city[random1000].city}, ${city[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        image: `https://picsum.photos/400?random=${Math.random()}`,
        price: price,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.', 
    });
        await camp.save();
    }
}

seedDB();
