const Question = require("../models/Question");
const Fact = require("../models/Facts");

const addFact = async (req, res) => {
  try {
    const fact = new Fact(req.body);
    await fact.save();
    res.status(201).send("Fact added successfully");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const fetchFact = async (req, res) => {
  try {
    const { number } = req.params;

    if (!isNaN(number)) {
      // Number is a numeric value
      const facts = await Fact.aggregate([
        { $sample: { size: parseInt(number, 10) } },
      ]);
      return res.status(200).json(facts);
    } else if (number.toLowerCase() === "fotd") {
      // Fact of the day
      const date = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
      const seed = Array.from(date).reduce(
        (acc, char) => acc + char.charCodeAt(0),
        0
      );
      const fact = await Fact.findOne().skip(
        seed % (await Fact.countDocuments())
      );
      return res.status(200).json(fact);
    } else {
      // Consider as category
      const facts = await Fact.find({ category: number });
      return res.status(200).json(facts);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const addQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).send("Question added successfully");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const fetchQuestion = async (req, res) => {
  try {
    const { number } = req.params;

    if (!isNaN(number)) {
      // Number is a numeric value
      const questions = await Question.aggregate([
        { $sample: { size: parseInt(number, 10) } },
      ]);
      return res.status(200).json(questions);
    } else {
      // Consider as category
      const questions = await Question.find({ category: number });
      return res.status(200).json(questions);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  addFact,
  fetchFact,
  addQuestion,
  fetchQuestion,
};
