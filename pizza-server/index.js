// const express = require("express");
import express from "express";
import mongoose from "mongoose";
import router from "./routes/pizza.js";
import { userRouter } from "./routes/user.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT || process.env.LOCAL_PORT;

const url = process.env.MONGODB_URI || "mongodb://localhost/food";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;
con.on("open", () => console.log("MongoDB is connected"));
app.use(cors());
// middleware
app.use(express.json());

app.get("/", (request, respone) => {
  respone.send("Welcome to node app!!!! Hi Guys");
});

app.use("/users", userRouter);

app.use("/pizzas", router);

app.listen(PORT, () => console.log("The server is started in " + PORT));
