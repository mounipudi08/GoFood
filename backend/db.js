const mongoose = require("mongoose");
const dbURL = "mongodb://127.0.0.1:27017/Gofood";

// const mongoURL =
//   "mongodb+srv://dabbawala:dabbawala@cluster0.rjyceus.mongodb.net/";

// const jkmongoDB = async () => {
//   await mongoose.connect(dbURL, { useNewUrlParser: true }, async (err, res) => {
//     if (err) console.log("---", err);
//     else {
//       console.log("connection established!!");
//       const fetched_data = await mongoose.connection.db.collection(
//         "food_items"
//       );
//       fetched_data.find({}).toArray(function (err, data) {
//         if (err) console.log(err);
//         else {
//           global.food_items = data;
//           console.log(global.food_items);
//         }
//       });
//     }
//   });
// };

// const mongoDB = async () => {
//   try {
//     await mongoose.connect(dbURL);
//     console.log("Connection established!");

//     const fetchedData = await mongoose.connection.db.collection("food_items");
//     fetchedData.find({}).toArray(async function (err, data) {
//       const foodCategory = await mongoose.connection.db.collection("food_category")
//       foodCategory.find({}).toArray(function (err, catData) {
//         if (err) console.error(err);
//         else {
//           global.food_items = data;
//           global.food_category = catData;
//         }
//       });
//     });
//   } catch (err) {
//     console.log("---", err);
//   }
// };

const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(dbURL);
    console.log("Connection established!");

    // Fetch data from 'food_items' collection
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodItemsData = await foodItemsCollection.find({}).toArray();

    // Fetch data from 'food_category' collection
    const foodCategoryCollection =
      mongoose.connection.db.collection("foodCollection");
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();

    // Store fetched data in global variables
    global.food_items = foodItemsData;
    global.food_category = foodCategoryData;

    console.log("Data fetched successfully!");
  } catch (err) {
    console.error("Error:", err);
  }
};

mongoDB();

module.exports = mongoDB;

// module.exports = () => {
//   return mongoose.connect(dbURL);
// };
