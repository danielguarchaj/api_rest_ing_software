module.exports = (app) => {
  const students = require("../controllers/student.controller.js");
  const router = require("express").Router();

  router.post("/", students.create);
  router.get("/", students.findAll);
  router.get("/:id", students.findOne);
  router.put("/:id", students.update);

  app.use("/api/students", router);
};
