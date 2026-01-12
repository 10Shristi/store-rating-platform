const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const ownerController = require("../controllers/ownerController");

router.get(
  "/ratings",
  authenticate,
  authorizeRoles(["OWNER"]),
  ownerController.getRatings
);

router.get(
  "/average",
  authenticate,
  authorizeRoles(["OWNER"]),
  ownerController.getAverageRating
);

module.exports = router;
