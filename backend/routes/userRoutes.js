const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const userController = require("../controllers/userController");

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
