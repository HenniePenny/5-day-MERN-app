const express = require("express");
const router = express.Router();

const questionRoutes = require("./questionRoutes");
const answerRoutes = require("./answerRoutes");

//test route
router.get("/", (req, res) => {
  res.send("Welcome to Kysymys");
});

router.use("/questions", questionRoutes);
router.use("/answers", answerRoutes);

module.exports = router;
