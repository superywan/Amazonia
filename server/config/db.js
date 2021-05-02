import mongoose from "mongoose";
import colors from "colors";

// Connecting To MongoDB Atlas
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(
      `Successfully Connected to MongoDB Atlas : ${connect.connection.host}`
        .cyan.italic
    );
  } catch (error) {
    console.error(`${error.message}`.red.underline);
    process.exit(1);
  }
};

export default connectDB;
