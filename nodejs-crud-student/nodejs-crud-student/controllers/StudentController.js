const studentService =require("../services/StudentService");
const StudentSchema = require("../models/Student.js");

exports.getAllStudents = async (req, res) => {
    try{
        const students = await studentService.getAllStudents();
        res.json({data: students, status: "success"});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.createStudent = async (req, res) =>{
    try{
        const student = await studentService.createStudent(req.body);
        res.json({data: student, status: "success"});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.getStudentById = async (req, res) =>{
    try{
        const student = await studentService.getStudentById(req.params.id);
        res.json({data: student, status: "success"});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};
exports.updateStudent = async (req, res) =>{
    try{

        const student = await studentService.updateStudent(req.params.id, req.body);
        if (student == null) {
            res.status(404).json({ message : `Không tìm thấy sinh viên có mã id ${req.params.id}`, status: "error"});
        } else {
        res.json({data: student, status: "success"});
        }
    }catch(err){
        res.status(500).json({error: `id sinh viên không hợp lệ`});
    }
};
exports.deleteStudent = async (req, res) =>{
    try{
        const student = await studentService.deleteStudent(req.params.id, req.body);
        if (student == null) {
            res.status(404).json({ message : `Không tìm thấy sinh viên có mã id ${req.params.id}`, status: "error"});
        } else {
        res.json({data: student, status: "success"});
        }
    }catch(err){
        res.status(500).json({error: `id sinh viên không hợp lệ`});
    }
};
exports.searchStudents = async (req, res) => {
    try {
        const { query } = req.query;
        // Tìm sinh viên theo StudentId hoặc Name (không phân biệt hoa thường)
        const searchConditions = [];
        if (!isNaN(query) && query.trim() !== "") {
            searchConditions.push({ "StudentId": Number(query) });
        }

        // Tìm kiếm theo tên nếu query không phải là số hoặc song song với StudentId
        if (query.trim() !== "") {
            searchConditions.push({ "Name": { $regex: new RegExp(query + '.*'), $options: 'i' } });
        }

        // Nếu có điều kiện tìm kiếm, thực hiện truy vấn
        const students = await StudentSchema.find({
            $or: searchConditions
        });

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};