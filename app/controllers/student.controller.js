const db = require("../models");
const Student = db.students;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Name can not be empty" });
    return;
  }

  const { body: studentData } = req;
  const student = new Student({ ...studentData });

  student
    .save(student)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something went wrong while creating the new Student",
      });
    });
};

exports.findAll = (_req, res) => {
  Student.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something went wrong when retrieving all students",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Student.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Student with ID ${id} not found` });
        return;
      }
      res.send(data);
    })
    .catch((_err) => {
      res
        .status(500)
        .send({ message: `Error retrieving Student with ID ${id}` });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty",
    });
  }
  const { id } = req.params;
  const { body: studentData } = req;
  Student.findByIdAndUpdate(id, studentData, { userFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Student with ID ${id} since it has not been found`,
        });
        return;
      }
      res.send({ message: "Student updated successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error while updating student with ID ${id}`,
      });
    });
};
