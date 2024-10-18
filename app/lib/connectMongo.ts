import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config();

const connectMongoDB = async () => {
  const connectionUrl = process.env.MONGODB_URL;

  // console.log("MongoDB Connection URL:", connectionUrl);

  mongoose
    .connect(connectionUrl as string)
    .then(() => console.log("Ecommerce database connected successfully!"))
    .catch((err) =>
      console.log(`Getting Error from DB connection ${err.message}`)
    );
};

export default connectMongoDB;