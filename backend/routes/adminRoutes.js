const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const adminController = require("../controllers/adminController");

router.post(
  "/store",
  authenticate,
  authorizeRoles(["ADMIN"]),
  adminController.addStore
);

router.get(
  "/stats",
  authenticate,
  authorizeRoles(["ADMIN"]),
  adminController.getStats
);

module.exports = router;
