import mongoose from "mongoose";

const commentSchema = mongoose.Schema({

  commenter: {
    type: String,
    require: true
  }
});
