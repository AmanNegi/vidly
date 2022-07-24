const mongoose = require("mongoose");
const Joi = require("joi");
const { Genre, genreSchema } = require("./genre");

/*
 * A representation of how the data will be stored in the database
 */
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 5,
    max: 255,
    trim: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    default: 0,
  },
  dailyRentalRate: {
    type: Number,
    default: 0,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

/*
 * Validate the incoming data from user
 */
function validate(requestBody) {
  console.log(`Validating ${requestBody}`);
  const schema = Joi.object().keys({
    title: Joi.string().min(5).max(255).required(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number(),
    genreId: Joi.string().required(),
  });
  return schema.validate(requestBody);
}

exports.Movie = Movie;
exports.validate = validate;
