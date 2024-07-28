const Listings = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./validateSchema.js");
const { reviewSchema } = require("./validateSchema.js");
const Review = require("./models/review.js");

const authenticateLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    if (req.method === "DELETE") {
      const { id } = req.params;
      req.session.redirectUrl = `/listings/${id}`;
    } else {
      req.session.redirectUrl = req.originalUrl;
    }
    req.flash("error", "Please Login");
    return res.redirect("/user/login");
  }
  next();
};

const redirectPath = (req, res, next) => {
  res.locals.redirectUrl = req.session.redirectUrl;
  next();
};

const isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listings.findById(id);
  if (!(res.locals.currUser && listing.owner.equals(res.locals.currUser._id))) {
    req.flash("error", "Permission denied");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

const isAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!(res.locals.currUser && review.author.equals(res.locals.currUser._id))) {
    req.flash("error", "Permission denied");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// Validation middleware
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(
      400,
      error.details.map((el) => el.message).join(",")
    );
  }
  next();
};
// review schema validation middleware
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(
      400,
      error.details.map((el) => el.message).join(",")
    );
  }
  next();
};

module.exports = {
  authenticateLogin,
  redirectPath,
  isOwner,
  isAuthor,
  validateListing,
  validateReview,
};
