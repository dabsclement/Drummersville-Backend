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
    password: req.body.password,
    isAdmin: req.body.isAdmin
  });

  if (req.body.isAdmin) {
    newUser.isAdmin = true;
  }

  // ensures no duplicate user
  await User.findOne({ emailAddress: newUser.emailAddress })
    .then(async (profile) => {
      if (!profile) {
        // hash password using bcrypt
        bcrypt.hash(newUser.password, saltRounds, async (err, hash) => {
          if (err) {
            res.status(401).json({
              status: "error",
              message: err.message
            });
          } else {
            newUser.password = hash;
            await newUser
              .save()
              .then(() => {
                return res.status(201).json({
                  status: "success",
                  message: "Signup succesful",
                  data: {
                    emailAddress: newUser.emailAddress,
                    userName: newUser.userName
                  }
                });
              })
              .catch((err) => {
                res.status(401).json({
                  status: "error",
                  message: err.message
                });
              });
          }
        });
      } else if (profile) {
        res.status(401).json({
          status: "error",
          message: "This profile already exists"
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        error: err.message
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
        res.status(500).json({
          status: "error",
          error: "profile does not exist"
        });
      } else {
        bcrypt.compare(
          newUser.password,
          profile.password,
          async (err, result) => {
            if (err) {
              res.status(401).json({
                status: "error",
                message: err.message
              });
            } else if (result) {
              const token = jwt.sign({
                email: profile.emailAddress,
                userId: profile._id,
                username: profile.userName
              }, process.env.secretKey || "defaultKey", { expiresIn: "24h" });
              return res.status(201).json({
                status: "error",
                message: "login succesful",
                data: {
                  emailAddress: profile.emailAddress,
                  userName: profile.userName,
                  token
                }
              });
            } else {
              res.status(401).json({
                status: "error",
                message: "User unauthorized access"
              });
            }
          }
        );
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        error: err
      });
    });
};
