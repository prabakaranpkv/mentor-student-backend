import express, { response } from "express";
import { Students } from "../models/student.js";
const router = express.Router();
router
  .route("/students")
  //getting students
  .get(async (request, response) => {
    try {
      const studentsList = await Students.find();
      response.send(studentsList);
      console.log(studentsList);
    } catch (err) {
      response.send(err);
      console.log(err);
    }
  })
  //creating Student
  .post(async (request, reaponse) => {
    const addStdnt = request.body;
    console.log(addStdnt);

    const student = new Students(addStdnt);
    try {
      const newStudent = await student.save();
      response.send({ newStudent, message: "Created Successfully" });
    } catch (err) {
      response.status(500);
      response.send(err);
      console.log(err);
    }
  });

router
  .route("/students/:name")
  //get student by id
  .get(async (request, response) => {
    const { name } = request.params;
    try {
      const student = await Students.findOne({ name: name });
      response.send(student);
      console.log(student);
    } catch (err) {
      response.send(err);
      console.log(err);
    }
  })

  // delete by Id
  .delete(async (request, response) => {
    const { id } = request.params;
    console.log("id removed", id);
    try {
      const student = await Students.findById({ _id: id });
      console.log("student removed", student);
      await student.remove();
      response.send({ student, message: "deleted successfully" });
    } catch (err) {
      response.send(err);
      console.log(err);
    }
  });

//assign mentor to student
router.route("/students/assign-mentor").post(async (request, reponse) => {
  const { id, mentorId } = request.body;
  try {
    const student = await Students.findById({ _id: id });
    if (student) {
      student.mentorId = mentorId;
    }
    await student.save();
    response.send({ student, message: "Mentor Assigned Successfully" });
  } catch (err) {
    response.send(err);
    console.log(err);
  }
});

//tested Change mentor
router.route("/students/change-mentor").patch(async (request, response) => {
  const { id, mentorId } = request.body;
  try {
    const student = await Students.findByOne({ _id: id });
    if (mentorId) {
      student.mentorId = mentorId;
    }
    await student.save();
    response.send({ student, message: "mentor Changed Successfully" });
    console.log(student);
  } catch (err) {
    response.send(err);
    console.log(err);
  }
});
router.route("/students/find-by-mentor/").post(async (request, response) => {
  const { mentorId } = request.body;
  try {
    const students = await Students.find({ mentorId: mentorId });
    if (students) {
      response.send(students);
    } else {
      response.send("No Student Assigned for this mentor");
    }
    console.log(students);
  } catch (err) {
    console.log(err);
    response.send("No Student Assigned for this mentor");
  }
});

export const studentRouter = router;
