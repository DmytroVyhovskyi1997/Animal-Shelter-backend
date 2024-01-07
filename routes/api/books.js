const express = require("express");

const books = require("../../models/books");
const {HttpError} = require('./helpers/HttpError')
const router = express.Router();

router.get("/", async (req, res) => {
  try {
      const result = await books.getAll();
      res.json(result);
  } catch (error) {
    next(error)
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await books.getById(id);
    if(!result){
      throw HttpError(404, 'Not Found');
    }
    res.json(result);
  } catch (error) {
next(error)
  }
});

module.exports = router;
