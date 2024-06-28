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
  category: {
    type: String,
    required: true,
  },
});

const Knowledge = mongoose.model("Knowledge", knowledgeSchema);

module.exports = Knowledge;
