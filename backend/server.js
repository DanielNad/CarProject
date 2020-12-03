require("dotenv").config({ path: "config/.env" });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const DatabaseConnection = require("./db/DatabaseConnection");
// const./db/DatabaseConnection = require("./db/db");
const data = require("./routes/api/data");

const _PORT = process.env.PORT || 9001;
const app = express();
const db = new DatabaseConnection();
const db1 = new DatabaseConnection();

mongoose.set("useFindAndModify", false);
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api", data);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status).json({
    error: {
      message: err.message,
    },
  });
  console.error(err.message);
});

app.listen(_PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server Connected on port: ${_PORT}`);
});
