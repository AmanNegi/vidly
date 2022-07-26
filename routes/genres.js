const router = require("express").Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validate } = require("../models/genre");

router.get("/", async function (req, res) {
  var genres = await Genre.find();
  res.send(genres);
});

router.post("/", auth, async function (req, res) {
  var validatedGenre = validate(req.body);
  console.log(validatedGenre);
  if (validatedGenre.error)
    return res.status(400).send(validatedGenre.error.message);
  var genre = new Genre({ name: req.body.genre });
  await genre.save();
  res.send(genre);
});

router.delete("/:genre", admin, async (req, res) => {
  console.log(req.params);
  var { error } = validate(req.params);
  if (error) return res.status(400).send(error.message);

  try {
    const { deletedCount } = await Genre.deleteOne({ name: req.params.genre });
    if (deletedCount > 0) res.send("Deleted Successfully");
    else res.send("No Genre found by the name " + req.params.genre);
  } catch (e) {
    return res.status(404).send("Enter a valid genre name");
  }
});

module.exports = router;
