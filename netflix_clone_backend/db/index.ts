import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://admin:f9DXPZGrBQIhjiUw@netflix-clone.cjhsz37.mongodb.net/?retryWrites=true&w=majority`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
