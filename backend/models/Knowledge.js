const mongoose = require("mongoose");

const knowledgeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Knowledge = mongoose.model("Knowledge", knowledgeSchema);

module.exports = Knowledge;
