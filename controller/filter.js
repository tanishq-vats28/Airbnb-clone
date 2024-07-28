const Listing = require("../models/listing.js");
const filterData = async (req, res) => {
  let { type } = req.params;
  let sampleData = await Listing.find({ filter: type });
  if (sampleData.length > 0) {
    res.render("listings/filtered.ejs", { sampleData });
  } else {
    req.flash("error", "No result found");
    res.redirect("/listings");
  }
};
function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
const searchData = async (req, res) => {
  let sampleData = await Listing.find({
    location: capitalizeWords(req.body.city),
  });
  console.log(sampleData);
  if (sampleData.length > 0) {
    res.render("listings/filtered.ejs", { sampleData });
  } else {
    req.flash("error", "No result found");
    res.redirect("/listings");
  }
};
module.exports = { filterData, searchData };
