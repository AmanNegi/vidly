const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});
const Customer = mongoose.model("Customer", customerSchema);

// Validate the incoming data from user
function validateCustomer(requestBody) {
  console.log(`Validating ${requestBody}`);
  const schema = Joi.object().keys({
    name: Joi.string().min(5).max(20).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().required(),
  });
  return schema.validate(requestBody);
}

exports.Customer = Customer;
exports.validate= validateCustomer;
