import { DatabaseConnectionError } from "@linklab-test-p/common";
import { sign } from "jsonwebtoken";
import mongoose from "mongoose";

import { app } from "./app";
const start = async () => {
  console.log("starting up..!!.!!!!.!!.");

  const MONGO_URI = `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.qhlhp.mongodb.net/fi?retryWrites=true&w=majority`;

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY muust be defined");
  }
  if (!process.env.MONGO_PASSWORD) {
    throw new Error("MONGO_PASSWORD must be defined");
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log("connected to mongodb");
  } catch (err) {
    console.error(err);
    throw new DatabaseConnectionError();
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
};

start();
