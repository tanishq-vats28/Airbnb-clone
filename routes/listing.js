const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const multer = require("multer");
const { storage } = require("../cloud.js");
const upload = multer({ storage });

const {
  authenticateLogin,
  isOwner,
  validateListing,
} = require("../middleware.js");
const controller = require("../controller/listing.js");

router
  .route("/")
  .get(wrapAsync(controller.homePage))
  .post(
    authenticateLogin,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(controller.addNewListing)
  );

// New listing
router.get("/new", authenticateLogin, controller.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(controller.renderShowPage))
  .put(
    authenticateLogin,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(controller.updateListing)
  )

  .delete(isOwner, authenticateLogin, wrapAsync(controller.destroyListing));

router.get(
  "/:id/edit",
  isOwner,
  authenticateLogin,
  wrapAsync(controller.renderEditForm)
);

module.exports = router;
