const mongoose = require("mongoose");
const Joi = require("joi");

const rentalSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema({
      name: {
        type: String,
        min: 5,
        max: 255,
        required: true,
      },
      isGold: Boolean,
      phone: String,
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: String,
      dailyRentalRate: Number,
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  const schema = Joi.object().keys({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(rental);
}

module.exports = { rentalSchema, Rental, validate: validateRental };
