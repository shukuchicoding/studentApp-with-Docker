import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const EditStudentDialog = ({ open, onClose, onSave, student }) => {
  const [editedStudent, setEditedStudent] = useState(student);
  useEffect(() => {
    setEditedStudent(student); // Mỗi khi student thay đổi, cập nhật lại giá trị của editedStudent
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedStudent); // Truyền thông tin sinh viên đã chỉnh sửa qua hàm onSave
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Student</DialogTitle>
      <DialogContent>
        <TextField
          name="StudentId"
          label="Student Id"
          value={editedStudent?.StudentId || ''}
          onChange={handleChange}
          fullWidth
          margin="dense"
          disabled // Không cho phép chỉnh sửa StudentId
        />
        <TextField
          name="Name"
          label="Name"
          value={editedStudent?.Name || ''}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="Roll"
          label="Roll"
          value={editedStudent?.Roll || ''}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="Birthday"
          label="Birthday"
          type="date"
          value={editedStudent?.Birthday}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="Address"
          label="Address"
          value={editedStudent?.Address || ''}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStudentDialog;
