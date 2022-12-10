const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema({
  description: String,
  imageURL: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  answers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answers",
  },
  user: Object,
});

module.exports = mongoose.model("Questions", questionsSchema);
