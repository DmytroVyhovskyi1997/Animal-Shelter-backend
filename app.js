const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose")
const booksRouter = require("./routes/api/books");



const app = express();

const DB_HOST = "mongodb+srv://Dmytro:vXhDk7o19qJCqIEC@cluster0.rufa2ly.mongodb.net/animals-shelter?retryWrites=true&w=majority"

const formatLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatLogger));
app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
mongoose.connect(DB_HOST);
module.exports = app;
