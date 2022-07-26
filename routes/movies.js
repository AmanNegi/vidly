const router = require("express").Router();
const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");

router.get("", async function (req, res) {
  var movies = await Movie.find();
  res.send(movies);
});

router.post("", async function (req, res) {
  var validatedMovie = validate(req.body);
  console.log(validatedMovie);
  if (validatedMovie.error)
    return res.status(400).send(validatedMovie.error.message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");

  var movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  await movie.save();
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  console.log(req.params);
  try {
    const oldcustomer = await customer.findByIdAndDelete({ id: req.params.id });
    res.send(oldcustomer);
  } catch (e) {
    return res.status(404).send("Enter a valid customer name");
  }
});

module.exports = router;
