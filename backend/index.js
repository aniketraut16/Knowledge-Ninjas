const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/connection");

const userRouter = require("./routes/userRoutes");
const QuestionAndFactsRouter = require("./routes/Questions&Facts");
const KnowledgeRouter = require("./routes/knowledge");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

app.use(userRouter);
app.use(QuestionAndFactsRouter);
app.use(KnowledgeRouter);

//Routes
app.use("/", (req, res) => {
  res.send("WELCOME TO KNOWLEDGE NINJAS");
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
