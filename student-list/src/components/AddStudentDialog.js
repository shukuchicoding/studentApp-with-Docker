import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const AddStudentDialog = ({ open, onClose, onSave }) => {
    const [newStudent, setNewStudent] = useState({
        StudentId: '',
        Name: '',
        Roll: '',
        Birthday: '',
        Address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(newStudent);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Student</DialogTitle>
            <DialogContent>
                <TextField name="StudentId" label="Student Id" value={newStudent.StudentId} onChange={handleChange} fullWidth margin="dense" />
                <TextField name="Name" label="Name" value={newStudent.Name} onChange={handleChange} fullWidth margin="dense" />
                <TextField name="Roll" label="Roll" value={newStudent.Roll} onChange={handleChange} fullWidth margin="dense" />
                <TextField name="Birthday" label="Birthday" type="date" value={newStudent.Birthday} onChange={handleChange} fullWidth margin="dense" />
                <TextField name="Address" label="Address" value={newStudent.Address} onChange={handleChange} fullWidth margin="dense" />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddStudentDialog;
