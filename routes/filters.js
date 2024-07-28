const express = require("express");
const router = express.Router({ mergeParams: true });
const controller = require("../controller/filter.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.route("/:type").get(wrapAsync(controller.filterData));
router.route("/search").post(wrapAsync(controller.searchData));
module.exports = router;
