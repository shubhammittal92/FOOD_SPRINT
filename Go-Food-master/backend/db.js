const mongoose = require('mongoose');
const mongoURI ='mongodb+srv://shubmittal92:shubham@cluster0.ymb2hez.mongodb.net/gofoodmern?retryWrites=true&w=majority';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("Connected to Mongo Successfully!");

    const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
    global.food_items = fetched_data;

    const foodCategory = await mongoose.connection.db.collection("food_category").find({}).toArray();
    global.food_cat = foodCategory;

  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToMongo;
