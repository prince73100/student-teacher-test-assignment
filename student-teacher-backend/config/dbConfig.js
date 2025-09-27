import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "";
    await mongoose.connect(mongoURI);
    console.log("DB Connect successfully");
  } catch (error) {
    process.exit(1);
  }
};

export default connectDB;
