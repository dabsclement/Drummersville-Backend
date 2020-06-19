/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");
const user = require("../model/user");

const checkAuth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(token, process.env.secretKey);
  const userMail = decode.email;
  await user.findOne({ email: userMail })
    .then(profile => {
      if (profile.isadmin === true) {
        next();
        const authDetails = { token: userMail, isAdmin: user[0].isadmin };
        console.log(authDetails);
        return authDetails;
      }
    }).catch((err) => {
      res.status(500).json({
        message: err
      });
    });
};

// const checkAuth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decode = jwt.verify(token, process.env.secretKey);
//     const userMail = decode.email;
//     const { rows } = await userModel.getUser(userMail);
//     console.log(rows);
//     if (rows[0].email !== userMail) {
//       res.status(401).json({
//         message: "you are not an employee in this company"
//       });
//     }
//     // const authDetails = { token: userMail };
//     // return authDetails;
//     next();
//   } catch (err) {
//     res.status(500).json({
//       hell: "hell",
//       message: err
//     });
//   }
// };

module.exports = { checkAuth };
