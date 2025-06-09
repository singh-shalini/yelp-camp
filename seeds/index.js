const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "66e1b1aeabe5ea321e8f7920",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem, ipsunodem dolor sit amet consectetur adipisicing elit. Magni sapiente rerum, ad suscipit non reiciendis eveniet. Impedit nam quibusdam atque. Enim molestias odit corporis corrupti distinctio adipisci voluptate eveniet? Dignissimos.",
      price,
      geometry: { type: "Point", coordinates: [-113.1331, 47.0202] },
      images: [
        {
          url: "https://res.cloudinary.com/duygocxdl/image/upload/v1726687016/YelpCamp/a5smygapimae4gxleyah.jpg",
          filename: "YelpCamp/noooviy9ddmy6kzjh9dq",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
