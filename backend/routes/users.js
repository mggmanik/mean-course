const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
// const passport = require("passport");
const passportSetup = require("../middleware/passport-setup");
const User = require("../models/user");

router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then((user) => {
          res.status(201).json({
            message: "User Created!",
            user: user
          });
        }).catch(err => {
        res.status(500).json({
          error: err
        });
      });
    });
});

router.post("/login", (req, res) => {
  let fetchedUser;
  User.findOne({email: req.body.email}).then(user => {
    if (!user) {
      return res.status(401).json({
        message: "Auth Failed!"
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Auth Failed!"
      });
    }
    const token = jwt.sign(
      {email: fetchedUser.email, userId: fetchedUser._id},
      "secret_this_should_be_longer",
      {expiresIn: "1h"}
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id
    });
  }).catch(err => {
    return res.status(401).json({
      message: err
    });
  });
});

router.get("/oauth/google/login", passportSetup.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get("/oauth/google/redirect", passportSetup.authenticate('google'), (req, res) => {
  const token = req.user.token;
  // res.send(req.user.token);
  res.status(200).json({
    token: token
  });
});

module.exports = router;
