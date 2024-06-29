const Knowledge = require("../models/Knowledge");

const fetchKnowledge = async (req, res) => {
  try {
    const { number } = req.params;

    const knowledge = await Knowledge.aggregate([
      { $sample: { size: parseInt(number, 10) } },
    ]);
    return res.status(200).json(knowledge);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  fetchKnowledge,
};
