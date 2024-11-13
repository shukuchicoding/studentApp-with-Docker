import React from 'react';
import { TableCell, TableRow, Button } from '@mui/material';
 
const StudentRow = ({ student, onEdit, onDelete }) => {
    return (
        <TableRow>
            <TableCell>{student.StudentId}</TableCell>
            <TableCell>{student.Name}</TableCell>
            <TableCell>{student.Roll}</TableCell>
            <TableCell>{new Date(student.Birthday).toLocaleDateString('en-GB')}</TableCell>
            <TableCell>{student.Address}</TableCell>
            <TableCell>
                <Button style={{marginRight: '10px'}} variant="contained" color="primary" onClick={() => onEdit(student)}>Edit</Button>
                <Button variant="contained" color="error" onClick={() => onDelete(student._id)}>Delete</Button>
            </TableCell>
        </TableRow>
    );
};

export default StudentRow;
