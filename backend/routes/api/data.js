const express = require("express");
const Car = require("../../db/models/Car");
const {
  getCars,
  addCar,
  updateCar,
  deleteCar,
} = require("../../controllers/api/dataController");
const router = express.Router();

router
  .route("/data")
  .get(getCars)
  .post(addCar)
  .patch(updateCar)
  .delete(deleteCar);
router.use((err, req, res, next) => {
  res.status(err.status).json({
    success: false,
    message: err.message,
  });
});
module.exports = router;
