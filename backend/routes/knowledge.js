const express = require("express");
const Router = express.Router();
const KnowledgeController = require("../controllers/KnowledgeController");

// Router.post("/knowledge/post", KnowledgeController.postKnowledge);
Router.get("/knowledge/fetch/:number", KnowledgeController.fetchKnowledge);

module.exports = Router;
