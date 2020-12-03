const mongoose = require("mongoose");
const { Car, carSchema } = require("../../db/models/Car");

// ---------------------- Questions ? ----------------------
// Throw an object

exports.getCars = async (req, res, next) => {
  try {
    console.log("Getting all data from the database...");
    const cars = await Car.find();
    res.status(200).json({
      success: true,
      data: cars,
    });
    console.log("Data was sent to client.");
  } catch (error) {
    next(error);
  }
};

exports.addCar = async (req, res, next) => {
  try {
    if (!req.body) {
      // Change other throw.
      throw {
        message: "Please provide data.",
        status: 400,
      };
    } else {
      const result = await carSchema.validateAsync(req.body);
      const newCar = new Car(result);
      const msg = `Added ${newCar.name} to the database!`;
      console.log("Adding a new car to the database...");
      await newCar.save();
      res.status(201).json({
        success: true,
        message: msg,
      });
      console.log(msg);
    }
  } catch (error) {
    next(error);
  }
};

exports.updateCar = async (req, res, next) => {
  try {
    if (!req.body._id) {
      throw new Error("Please provide an id.");
    } else if (!req.body.data) {
      throw new Error("Please provide data.");
    } else if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
      throw new Error("Please provide a valid id.");
    } else {
      const result = await carSchema.validateAsync(req.body.data);
      const msg = `Updated ${req.body.data.name}.`;
      console.log("Updating a car...");
      const car = await Car.updateOne({ _id: req.body._id }, { $set: result });
      if (car.n <= 0) {
        throw new Error("No matching id was found.");
      } else {
        res.status(200).json({
          success: true,
          message: msg,
        });
        console.log(msg);
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteCar = async (req, res, next) => {
  try {
    if (!req.body._id) {
      throw new Error("Please provide an id.");
    } else if (!mongoose.Types.ObjectId.isValid(req.body._id)) {
      throw new Error("Please provide a valid id.");
    } else {
      console.log(`Deleting a car...`);
      const deletedCar = await Car.findByIdAndRemove(req.body._id);
      if (!deletedCar) {
        throw new Error("Car was not found!");
      } else {
        const msg = `Deleted ${deletedCar.name}`;
        res.status(200).json({
          success: true,
          message: msg,
        });
        console.log(msg);
      }
    }
  } catch (error) {
    next(error);
  }
};
