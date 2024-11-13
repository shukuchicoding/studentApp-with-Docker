const express = require("express");
const {
    getAllStudents,
    createStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
    searchStudents,
} = require("../controllers/StudentController");

const router = express.Router();

router.route("/search").get(searchStudents);
router.route("/").get(getAllStudents).post(createStudent);
router.route("/:id").get(getStudentById).put(updateStudent).delete(deleteStudent);

module.exports = router;