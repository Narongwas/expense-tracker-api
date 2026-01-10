import mongoose from "mongoose";

async function connectDB() {
  await mongoose
    .connect(process.env.MONGO_URI || "")
    .then(() => console.log("database connected"))
    .catch((error) => console.error(error));
}

export default connectDB;
