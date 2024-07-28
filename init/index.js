const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
let sampleListings = require("./data.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wonderLust";

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDb = async () => {
  try {
    await Listing.deleteMany({});
    sampleListings = sampleListings.map((obj) => ({
      ...obj,
      owner: "669b0be696b6b2bc402c3852",
    }));
    await Listing.insertMany(sampleListings);
    console.log("data was saved");
  } catch (err) {
    console.log("Error saving data:", err);
  }
};

initDb();
