const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
let sampleListings = require("./data.js");
const MONGO_URL =
  "mongodb+srv://tanishqvats2804:rAG9o27ftucFPmXJ@cluster0.tmyazh6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
      owner: "66a5a854a20861375f3e50d9",
    }));
    await Listing.insertMany(sampleListings);
    console.log("data was saved");
  } catch (err) {
    console.log("Error saving data:", err);
  }
};

initDb();
