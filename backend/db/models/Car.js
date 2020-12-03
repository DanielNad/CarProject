const Mongoose = require("mongoose");
const Joi = require("joi");

const carSchema = {
  name: { type: String, min: 1, max: 30, required: true },
  topSpeed: { type: Number, min: 0, max: 300, required: true },
  price: { type: Number, min: 0, required: true },
};

const joiCarSchema = Joi.object().keys({
  name: Joi.string().alphanum().min(1).max(30).required(),
  topSpeed: Joi.number().min(0).max(300).required(),
  price: Joi.number().min(0).required(),
});

const Car = Mongoose.model("Car", carSchema);
exports.Car = Car;
exports.carSchema = joiCarSchema;
