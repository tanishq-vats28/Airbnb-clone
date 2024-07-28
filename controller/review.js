const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const addNewReview = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    throw new ExpressError(404, "Listing Not Found");
  }

  const newReview = new Review(req.body.review);
  newReview.author = res.locals.currUser._id;
  console.log(newReview);
  await newReview.save();

  listing.reviews.push(newReview);
  await listing.save();
  req.flash("success", "New Review Added");
  res.redirect(`/listings/${id}`);
};
const destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted");
  res.redirect(`/listings/${id}`);
};
module.exports = { addNewReview, destroyReview };
