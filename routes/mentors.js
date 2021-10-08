import express from "express";
import { Mentors } from "../models/mentor.js";
const router = express.Router();
router
  .route("/mentors")
  //getting mentors
  .get(async (request, response) => {
    try {
      const mentorsList = await Mentors.find();
      response.send(mentorsList);
      console.log(mentorsList);
    } catch (err) {
      response.send(err);
      console.log(err);
    }
  })
  //create mentors
  .post(async (request, response) => {
    const addMentor = request.body;
    console.log(addMentor);

    const mentor = new Mentors(addMentor);
    try {
      const newMentor = await mentor.save();
      response.send({ newMentor, message: "Created Successfully" });
    } catch (err) {
      response.status(500);
      response.send(err);
      console.log(err);
    }
  });

export const mentorRouter = router;
