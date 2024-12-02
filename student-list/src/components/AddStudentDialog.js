import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const AddStudentDialog = ({ open, onClose, onSave }) => {
    const [newStudent, setNewStudent] = useState({
        StudentId: '',
        Name: '',
        Roll: '',
        Birthday: '',
        Address: ''
    });

    const [isFormValid, setIsFormValid] = useState(false);

    // Hàm kiểm tra xem tất cả các trường đã được điền hay chưa
    const validateForm = () => {
        const { StudentId, Name, Roll, Birthday, Address } = newStudent;
        return StudentId && Name && Roll && Birthday && Address; // Tất cả các trường phải khác rỗng
    };

    // Mỗi khi giá trị của `newStudent` thay đổi, kiểm tra tính hợp lệ
    useEffect(() => {
        setIsFormValid(validateForm());
    }, [newStudent]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (isFormValid) {
            onSave(newStudent);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Student</DialogTitle>
            <DialogContent>
                <TextField
                    name="StudentId"
                    label="Student Id"
                    value={newStudent.StudentId}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    required
                />
                <TextField
                    name="Name"
                    label="Name"
                    value={newStudent.Name}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    required
                />
                <TextField
                    name="Roll"
                    label="Roll"
                    value={newStudent.Roll}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    required
                />
                <TextField
                    name="Birthday"
                    label="Birthday"
                    type="date"
                    value={newStudent.Birthday}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField
                    name="Address"
                    label="Address"
                    value={newStudent.Address}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained" color="primary" disabled={!isFormValid}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddStudentDialog;
