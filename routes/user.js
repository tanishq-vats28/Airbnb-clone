const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const { redirectPath } = require("../middleware.js");
const controller = require("../controller/user.js");

router
  .route("/signUp")
  .get(controller.renderSignupForm)
  .post(wrapAsync(controller.addUser));

router
  .route("/login")
  .get(controller.renderLoginForm)
  .post(
    redirectPath,
    passport.authenticate("local", {
      failureRedirect: "/user/login",
      failureFlash: "No User Exist",
    }),
    controller.loginUser
  );
router.get("/logout", controller.logout);

module.exports = router;
