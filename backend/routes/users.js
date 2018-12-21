const express = require("express");
const UserController = require("../controllers/user")
const router = express.Router();
const jwt = require("jsonwebtoken");
const passportSetup = require("../middleware/passport-setup");


router.post("/signup", UserController.createUser);

router.post("/login", UserController.loginUser);

router.get("/oauth/google/login", UserController.googleAuth);

router.get("/oauth/google/redirect", passportSetup.authenticate('google', {
  failureRedirect: "/",
  session: false
}), (req, res) => {
  const email = req.user.email;
  const userId = req.user.userId;

  const token = jwt.sign({email: email, userId: userId}, process.env.JWT_KEY, {expiresIn: "1h"});

  res.redirect(`http://localhost:4200?token=${token}&expiresIn=${3600}&userId=${userId}`);
});

module.exports = router;
