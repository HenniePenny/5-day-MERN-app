const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  answer: String,
  questionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: Object,
});

module.exports = mongoose.model("Answers", answerSchema);
