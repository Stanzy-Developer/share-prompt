import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  mongoose.set("strict", true);
  if (isConnected) {
    console.log("mongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("mongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};
