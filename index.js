import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { studentRouter } from "./routes/students.js";
import { mentorRouter } from "./routes/mentors.js";

const app = express();
const PORT = process.env.PORT || 4000;

//opened connection to database
const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;
con.on("open", () => console.log("MongoDB is connected"));

//middleware

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Welcome to node app");
});
app.use("/", studentRouter);
app.use("/", mentorRouter);

app.listen(PORT, () => console.log(`server is started at ${PORT}`));
