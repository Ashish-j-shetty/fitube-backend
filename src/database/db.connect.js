const DB_URI = process.env.DB_URI;
const mongoose = require("mongoose");

async function initializeDBConnection() {
  try {
    await mongoose.connect(DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: true,
      useCreateIndex: true,
    });

    console.log("DB connected successfully.");
  } catch (error) {
    console.log("DB connection failed", error);
  }
}

module.exports = { initializeDBConnection };
