var mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("user", UserSchema);

// // Imports
// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import validator from "validator";
// import jwt from "jsonwebtoken";

// // User Schema
// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 6,
//       maxlength: 12,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//       validate(value) {
//         if (!validator.isEmail(value)) {
//           throw new Error("Email is invalid");
//         }
//       },
//     },
//     isAdmin: {
//       type: Boolean,
//       default: false,
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//       trim: true,
//     },
//   },

//   {
//     timestamps: true,
//   }
// );

// userSchema.pre('save', function(next){
//   if(!this.isModified('password')) {
//       return next()
//   }

//   bcrypt.hash(this.password, 8 (err, hash) => {
//       if (err) {
//           return next(err)
//       }

//       this.password = hash
//       next()
//   })
// })

// userSchema.methods.checkPassword = function(password) {
//   const passwordHash = this.password
//   return new Promise ((resolve, reject) => {
//       bcrypt.compare(password, passwordHash, (err, same) =>{
//           if (err) {
//               return reject(err)
//           }
//           resolve(same)
//       })
//   })
// }

// export const User = mongoose.model("user", userSchema);
