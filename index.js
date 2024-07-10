import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/config.js";
import userRouter from "./Routers/userRoute.js";
dotenv.config();

const app = express();
//middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

connectDB();

//Defaultroutes
app.get("/", (req, res) => {
  res.status(200).send("This Api Works Good");
});

//Api Routes
app.use("/api/user", userRouter);

//Listen
app.listen(process.env.PORT, () => {
  console.log("App is Running Successfully");
});
