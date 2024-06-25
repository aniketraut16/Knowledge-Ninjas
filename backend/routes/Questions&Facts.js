const express = require("express");
const Router = express.Router();

const Controller = require("../controllers/Questions&FactsController");

Router.post("/facts/addfact", Controller.addFact);
Router.get("/facts/:number", Controller.fetchFact);

Router.post("/questions/addQuestion", Controller.addQuestion);
Router.get("/questions/:number", Controller.fetchQuestion);

module.exports = Router;
