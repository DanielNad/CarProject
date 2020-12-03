const mongoose = require("mongoose");

class DatabaseConnection {
  constructor() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = this.createInstance();
    }
  }

  async createInstance() {
    try {
      const connection = await mongoose.connect(
        process.env.DB_URI,
        {
          useCreateIndex: true,
          useUnifiedTopology: true,
          useNewUrlParser: true,
        },
        console.log("Database Connected")
      );
    } catch (err) {
      console.error("Cannot connect to database");
      process.exit(1);
    }
  }
}

module.exports = DatabaseConnection;
