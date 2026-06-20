const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://admin:password123@mongodb-service:27017/notesdb?authSource=admin"
);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("MongoDB Connected");
});

db.on("error", (err) => {
  console.log("MongoDB Error:", err);
});

module.exports = mongoose;
