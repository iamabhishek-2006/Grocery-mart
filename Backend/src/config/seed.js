require("dotenv").config();
const connectDB = require("./dbconnection");
const User = require("../models/user");
const { hashPassword } = require("../utils/scripts");

const dbSeed = async () => {
  try {
    await connectDB();
    console.log("Database seeding");
    console.log("creating Admin User");

    const admin = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: await hashPassword("admin"),
      role: "admin",
    });
    await admin.save();
    process.exit(0);
  } catch (error) {
    if (error.code === 11000) {
      console.log("A user with this email already exists");
      process.exit(1);
    }
    console.log(error);
    console.log("something went wrong");
    process.exit(1);
  }
};
dbSeed();

