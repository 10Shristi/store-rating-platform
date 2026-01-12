const express = require("express");
const router = express.Router();

// ✅ AUTH MIDDLEWARE (CHECK PATH CAREFULLY)
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

// ✅ CONTROLLER
const userController = require("../controllers/userController");

// USER ROUTES
router.get(
  "/stores",
  authenticate,
  authorizeRoles(["USER"]),
  userController.getStores
);

router.post(
  "/rate",
  authenticate,
  authorizeRoles(["USER"]),
  userController.rateStore
);

router.put(
  "/update-password",
  authenticate,
  authorizeRoles(["USER", "OWNER"]),
  userController.updatePassword
);

module.exports = router;

