const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const checkAdmin = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(token, process.env.secretKey || "defaultKey");
  const userMail = decode.email;
  await userModel.findOne({ emailAddress: userMail })
    .then(data => {
      console.log(data);
      if (data.email !== userMail) {
        res.status(401).json({
          message: "Auth failed"
        });
      }

      if (!data.isAdmin) {
        res.status(401).json({
          message: "You do not have the necessary rights to perform this action"
        });
      }
      next();
    })

    .catch((err) => {
      res.status(500).json({
        status: "Auth failed",
        message: err.message
      });
    });
};

const checkAuth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(token, process.env.secretKey || "defaultKey");
  const userMail = decode.email;
  await userModel.findOne({ emailAddress: userMail })
    .then(data => {
      if (data.email !== userMail) {
        res.status(401).json({
          message: "Auth failed"
        });
      }
      next();
    })
    .catch((err) => {
      res.status(500).json({
        status: "Auth Failed",
        message: err.message
      });
    });
};

module.exports = { checkAdmin, checkAuth };
