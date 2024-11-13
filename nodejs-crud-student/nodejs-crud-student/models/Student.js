const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    StudentId: Number,
    Name: String,
    Roll: Number,
    Birthday: Date,
    Address: String
});

module.exports = mongoose.model("Student", StudentSchema, "Students");