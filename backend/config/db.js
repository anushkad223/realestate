const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("URI:", process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected:", conn.connection.host);
    console.log("Database name:", conn.connection.name);
    console.log("Ready state:", mongoose.connection.readyState);
  } catch (err) {
    console.error("MongoDB Connection Error:");
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;