const mongoose = require("mongoose");
const router = require("express").Router();
const { Customer, validate  } = require("../models/customer");
const auth = require("../middleware/auth");

router.get("", async function (req, res) {
  var customers = await Customer.find();
  res.send(customers);
});

router.post("",auth, async function (req, res) {
  var validatedcustomer = validate(req.body);
  console.log(validatedcustomer);
  if (validatedcustomer.error)
    return res.status(400).send(validatedcustomer.error.message);
  var customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isgold: req.body.isgold,
  });
  await customer.save();
  res.send(customer);
});

router.delete("/:id",auth, async (req, res) => {
  console.log(req.params);
  var { error } = validate(req.params);
  if (error) return res.status(400).send(error.message);

  try {
    const oldcustomer = await Customer.findByIdAndDelete({
      id: req.params.id,
    });
    res.send(oldcustomer);
  } catch (e) {
    return res.status(404).send("enter a valid customer name");
  }
});

module.exports = router;
