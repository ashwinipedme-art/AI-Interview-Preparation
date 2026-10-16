const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Test Route
router.get("/", (req, res) => {
  res.send("Auth Route Working");
});

module.exports = router;