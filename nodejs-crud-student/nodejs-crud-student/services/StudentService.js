
const StudentModel = require("../models/Student");

exports.getAllStudents = async() => {
    return await StudentModel.find();
};

exports.createStudent = async(student) => {
    const {StudentId, Name, Roll, Birthday, Address} = student;
    if (!StudentId || !Name || !Roll || !Birthday || !Address)
        throw new Error('All fields must be filled!');
    return await StudentModel.create(student);
};

exports.getStudentById = async(id) => {
    return await StudentModel.findById(id);
};

exports.updateStudent = async (id, student) => {
    return await StudentModel.findByIdAndUpdate(id, student);
};

exports.deleteStudent = async (id) => {
    return await StudentModel.findByIdAndDelete(id);
}