import { Router } from "express";

import instructorController from "../controllers/instructorController.js";

const router = Router();

router.post("/add-course", (req, res) => {
  return instructorController.sendCourse(res, req.body, "add");
});

router.delete("/delete-course", async (req, res) => {
  return await instructorController.deleteCourse(res, req.body);
});

export default router;
