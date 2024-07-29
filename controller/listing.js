const Listing = require("../models/listing.js");

const homePage = async (req, res) => {
  const sampleData = await Listing.find({});
  res.render("listings/index.ejs", { sampleData });
};
const renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};
const renderShowPage = async (req, res) => {
  const { id } = req.params;
  const listingData = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  console.log(listingData);
  if (!listingData) {
    req.flash("error", "Listing doesn't exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listingData });
};
const renderEditForm = async (req, res) => {
  const { id } = req.params;
  const prevData = await Listing.findById(id);
  if (!prevData) {
    throw new ExpressError(404, "Listing Not Found");
  }
  let editedImgUrl = prevData.image.url;
  editedImgUrl = editedImgUrl.replace("/upload", "/upload/w_250/e_blur:300");
  res.render("listings/edit.ejs", { prevData, editedImgUrl });
};

const addNewListing = async (req, res, next) => {
  if (!req.body.listing) {
    return next(new ExpressError(400, "Bad Request"));
  }
  const newListing = new Listing(req.body.listing);
  console.log(newListing);
  newListing.owner = req.user._id;
  newListing.image.url = req.file.path;
  newListing.image.filename = req.file.filename;
  await newListing.save();
  req.flash("success", "New Listing Added");
  res.redirect("/listings");
};
const updateListing = async (req, res, next) => {
  const { id } = req.params;
  if (!req.body.listing) {
    return next(new ExpressError(400, "Bad Request"));
  }

  const updatedListing = await Listing.findById(id);
  if (!updatedListing) {
    throw new ExpressError(404, "Listing Not Found");
  }

  if (Array.isArray(req.body.listing.filter)) {
    updatedListing.filter = req.body.listing.filter;
  } else {
    updatedListing.filter = req.body.listing.filter;
  }

  if (req.file) {
    updatedListing.image.url = req.file.path;
    updatedListing.image.filename = req.file.filename;
  }
  updatedListing.title = req.body.listing.title;
  updatedListing.description = req.body.listing.description;
  updatedListing.price = req.body.listing.price;
  updatedListing.location = req.body.listing.location;
  updatedListing.country = req.body.listing.country;
  updatedListing.filter = req.body.listing.filter;
  await updatedListing.save();
  req.flash("success", "Listing Edited");
  res.redirect(`/listings/${id}`);
};

const destroyListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
module.exports = {
  homePage,
  renderNewForm,
  renderShowPage,
  renderEditForm,
  addNewListing,
  updateListing,
  destroyListing,
};
