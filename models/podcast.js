var mongoose = require("mongoose");

const PodcastSchema = mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true

  },
  PodcastUrl: {
    type: String,
    required: true

  },
  downloadLink: {
    type: String,
    required: true

  },
  Description: {
    type: String,
    required: true

  },
  featured: {
    type: Boolean,
    default: false
  },
  Tags: {
    type: Array,
    required: true

  }
},

{
  timestamps: true
}
);

module.exports = mongoose.model("podcast", PodcastSchema);
