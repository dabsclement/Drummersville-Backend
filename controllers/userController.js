// const { check, validationResult } = require("express-validator");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var User = require("../models/user");
var bcrypt = require("bcrypt");
var saltRounds = 10;

exports.signup = async (req, res) => {
  // create new user
  var newUser = new User({
    emailAddress: req.body.email,
    userName: req.body.username,
    password: req.body.password
  });

  // ensures no duplicate user
  await User.findOne({ emailAddress: newUser.emailAddress })
    .then(async (profile) => {
      if (!profile) {
        // hash password using bcrypt
        bcrypt.hash(newUser.password, saltRounds, async (err, hash) => {
          if (err) {
            res.status(401).json({
              message: err.message
            });
          } else {
            newUser.password = hash;
            await newUser
              .save()
              .then(() => {
                return res.status(201).json({
                  message: "login succesful",
                  data: {
                    emailAddress: profile.emailAddress,
                    userName: profile.userName
                  }
                });
              })
              .catch((err) => {
                res.status(401).json({
                  message: err.message
                });
              });
          }
        });
      } else {
        res.status(401).json({
          message: "This profile already exists"
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
};

exports.signin = async (req, res) => {
  var newUser = {
    emailAddress: req.body.email,
    password: req.body.password
  };

  await User.findOne({ emailAddress: newUser.emailAddress })
    .then((profile) => {
      if (!profile) {
        res.send("Profils does not exist");
      } else {
        bcrypt.compare(
          newUser.password,
          profile.password,
          async (err, result) => {
            if (err) {
              res.status(401).json({
                message: err.message
              });
            } else if (result) {
              const token = jwt.sign({
                email: profile.email,
                userId: profile._id,
                username: profile.username
              }, process.env.secretKey || "defaultKey", { expiresIn: "24h" });
              return res.status(201).json({
                message: "login succesful",
                token,
                data: {
                  emailAddress: profile.emailAddress,
                  userName: profile.userName
                }
              });
            } else {
              res.status(401).json({
                message: "User unauthorized access"
              });
            }
          }
        );
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
};
