// const { check, validationResult } = require("express-validator");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
var User = require("../models/user");

exports.signup = async (req, res) => {
  var newUser = new User({
    name: req.body.name,
    password: req.body.password
  });

  await newUser
    .save()
    .then(() => {
      res.status(200).send({
        status: "success",
        newUser
      });
    })
    .catch((err) => {
      console.log("Error", err.message);
    });
};
