import React, { useState, useEffect } from 'react';
import { Container, Button } from '@mui/material';
import StudentTable from './components/StudentTable';
import AddStudentDialog from './components/AddStudentDialog';
import EditStudentDialog from './components/EditStudentDialog';
import ConfirmDialog from './components/ConfirmDialog';
import SearchBar from './components/SearchBar';
import { getStudents, addStudent, updateStudent, deleteStudent } from './services/studentService';

function App() {
  const [students, setStudents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingStudent, setEditingStudent] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const studentData = await getStudents();
      setStudents(studentData.data);
    };
    fetchData();
  }, []);

  const handleAddStudent = async (newStudent) => {
    await addStudent(newStudent);
    const updatedStudents = await getStudents();
    setStudents(updatedStudents.data);
    setOpenDialog(false);
  };

  const handleDeleteStudent = async () => {
    await deleteStudent(selectedStudentId);
    const updatedStudents = await getStudents();
    setStudents(updatedStudents.data);
    setOpenConfirmDialog(false);
  };

  const openConfirmDeleteDialog = (id) => {
    setSelectedStudentId(id); // Lưu lại ID sinh viên cần xóa
    setOpenConfirmDialog(true); // Mở hộp thoại xác nhận
  };

  const handleEditStudent = async (updatedStudent) => {
    setEditingStudent(updatedStudent); // Đặt sinh viên cần chỉnh sửa
    setOpenEditDialog(true); // Mở dialog chỉnh sửa
    await updateStudent(updatedStudent._id, updatedStudent);
    const updatedStudents = await getStudents();
    setStudents(updatedStudents.data);
  };

  return (
    <Container>
      <h1>Student List</h1>
      <SearchBar setSearchResults={setSearchResults} />
      <Button style={{ marginBottom: '20px' }}variant="contained" color="primary" onClick={() => setOpenDialog(true)}>Add Student</Button>
      <StudentTable students={searchResults.length > 0 ? searchResults : students} onEdit={handleEditStudent} onDelete={openConfirmDeleteDialog} />
      <AddStudentDialog open={openDialog} onClose={() => setOpenDialog(false)} onSave={handleAddStudent} />
      <EditStudentDialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} onSave={handleEditStudent} student={editingStudent} />
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={handleDeleteStudent}
        title="Confirm Delete"
        content="Are you sure you want to delete this student?"
      />
    </Container>
  );
}

export default App;
