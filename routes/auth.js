const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

/**
 * Logs in an authentic user
 */

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or Password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Email or Password");

  const token = user.generateAuthToken();

  res.send(token);
});

function validate(req) {
  const schema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  return schema.validate(req);
}

module.exports = router;
