const mongoose = require("mongoose");

const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Genre = mongoose.model("Genre", genreSchema);

// Validate the incoming data from user
function validateGenre(requestBody) {
  console.log(`Validating ${requestBody}`);
  const schema = Joi.object().keys({
    genre: Joi.string().required().min(3),
  });
  return schema.validate(requestBody);
}



module.exports = {
  validate: validateGenre,
  Genre: Genre,
  genreSchema: genreSchema
};