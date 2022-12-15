const express = require("express");
const router = express.Router();

//import model
const questionDB = require("../models/QuestionModel");

//add a question
//POST /api/question - ADD QUESTION
router.post("/", async (req, res) => {
  try {
    //save question to db
    await questionDB
      .create({
        description: req.body.description,
        imageURL: req.body.imageURL,
        user: req.body.user,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Question added successfully",
        });
      })
      .catch((err) => {
        res.status(400).send({
          //!Why status in quotes?
          status: false,
          message: "Question could not be added",
        });
      });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Server error while adding question",
    });
  }
});

//get all questions with their answers
//GET /api/questions - GET ALL QUESTIONS
router.get("/", async (req, res) => {
  try {
    //perform MongoDB "join" query to fetch all answers for questions based on the questionId field
    await questionDB
      .aggregate([
        {
          $lookup: {
            from: "Answers",
            localField: "_id",
            foreignField: "questionId",
            as: "allAnswers",
          },
        },
      ])
      //exec used in mongoose for fully-fledged promise, see https://mongoosejs.com/docs/promises.html
      //one of the ways of using await with queries is .exec() gives better stack traces (for errors)
      .exec()
      .then((doc) => {
        res.status(200).send(doc);
      })
      .catch((err) => {
        res.status(500).send({
          status: false,
          message: "Unable to get the questions",
        });
      });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Server error while getting questions",
    });
  }
});

module.exports = router;
