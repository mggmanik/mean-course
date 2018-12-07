const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const User = require("../models/user");

router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => {
          res.status(201).json({
            message: "User Created!"
          });
        }).catch(err => {
        res.status(500).json({
          error: err
        });
      });
    });
});

module.exports = router;
