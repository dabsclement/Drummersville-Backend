var mongoose = require("mongoose");

const PodcastSchema = mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true

<<<<<<< HEAD
  },
  PodcastUrl: {
    type: String,
    required: true

  },
  downloadLink: {
=======
  },
  Podcasturl: {
>>>>>>> e78f298eecb37007f41bb59a007eb221fb8dde2e
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
<<<<<<< HEAD
    type: Array,
=======
    type: Array[String],
>>>>>>> e78f298eecb37007f41bb59a007eb221fb8dde2e
    required: true

  }
},

{
  timestamps: true
}
);

module.exports = mongoose.model("podcast", PodcastSchema);
