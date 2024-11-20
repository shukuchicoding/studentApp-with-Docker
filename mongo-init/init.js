db = db.getSiblingDB("studentApp");

const studentsData = JSON.parse(cat('/docker-entrypoint-initdb.d/students.json'));
db.students.insertMany(studentsData);