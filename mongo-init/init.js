db = db.getSiblingDB("studentApp");

const studentsData = JSON.parse(cat('./students.json'));
db.students.insertMany(studentsData);