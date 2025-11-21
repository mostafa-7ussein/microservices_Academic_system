import { Course } from "../models/course.js";
import { kafkaSend } from "./kafkaProducer.js";
import dbController from "./dbController.js";

const sendCourse = (res, courseData, method) => {
  try {
    const course = new Course(courseData, method);
    kafkaSend(course);
    return res.status(200).json("message sent");
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const deleteCourse = async (res, courseData) => {
  try {
    const result = await dbController.deleteCourse(courseData);
    if (result.success) {
      const course = new Course(courseData, "delete");
      kafkaSend(course);
      return res.status(200).json(result.message);
    } else {
      return res.status(404).json(result.message);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export default { sendCourse, deleteCourse };
