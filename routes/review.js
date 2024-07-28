const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {
  validateReview,
  authenticateLogin,
  isAuthor,
} = require("../middleware.js");
const controller = require("../controller/review.js");
//Reviews
router.post(
  "/",
  authenticateLogin,
  validateReview,
  wrapAsync(controller.addNewReview)
);
router.delete(
  "/:reviewId",
  authenticateLogin,
  isAuthor,
  wrapAsync(controller.destroyReview)
);
module.exports = router;
