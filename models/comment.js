import mongoose from "mongoose";

const commentSchema = mongoose.Schema({

  commenter: {
    type: String,
    require: true
  }, 
   comment: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model("comment", commentSchema);
