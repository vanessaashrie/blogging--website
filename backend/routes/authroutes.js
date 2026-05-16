const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  followUser,
  getUserProfile,
} = require("../controllers/authController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);


router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.put(
  "/follow/:id",
  authMiddleware,
  followUser
);

router.get(
  "/user/:id",
  getUserProfile
);


module.exports = router;