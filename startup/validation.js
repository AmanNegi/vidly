/**
 * Seting Joi.objectId to the function provided 
 * by joi-objectid package
 */

const Joi = require("joi");

module.exports = function () {
  Joi.objectId = require("joi-objectid")(Joi);
};
