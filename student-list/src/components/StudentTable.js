import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    TableSortLabel
} from '@mui/material';
import StudentRow from './StudentRow';

// Hàm so sánh dùng để sắp xếp dữ liệu
const getComparator = (order, orderBy) => {
    return (a, b) => {
        if (b[orderBy] < a[orderBy]) {
            return order === 'asc' ? -1 : 1;
        }
        if (b[orderBy] > a[orderBy]) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    };
};

// Hàm sắp xếp dữ liệu dựa vào thứ tự và thuộc tính cột
const sortedRows = (rows, comparator) => {
    const stabilizedRows = rows.map((el, index) => [el, index]);
    stabilizedRows.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedRows.map((el) => el[0]);
};

const StudentTable = ({ students, onEdit, onDelete }) => {
    const [order, setOrder] = useState('asc'); // Trạng thái thứ tự sắp xếp
    const [orderBy, setOrderBy] = useState('StudentId'); // Trạng thái cột được sắp xếp
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Lấy danh sách sinh viên sau khi sắp xếp và phân trang
    const paginatedStudents = sortedRows(students, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 550 }}>
                <Table stickyHeader aria-label="sticky table">
                    <caption>Danh sách sinh viên</caption>
                    <TableHead>
                        <TableRow>
                            {/* Sử dụng TableSortLabel để tạo cột có thể sắp xếp */}
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'StudentId'}
                                    direction={orderBy === 'StudentId' ? order : 'asc'}
                                    onClick={() => handleRequestSort('StudentId')}
                                >
                                    Student ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'Name'}
                                    direction={orderBy === 'Name' ? order : 'asc'}
                                    onClick={() => handleRequestSort('Name')}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'Roll'}
                                    direction={orderBy === 'Roll' ? order : 'asc'}
                                    onClick={() => handleRequestSort('Roll')}
                                >
                                    Roll
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'Birthday'}
                                    direction={orderBy === 'Birthday' ? order : 'asc'}
                                    onClick={() => handleRequestSort('Birthday')}
                                >
                                    Birthday
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedStudents.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No students found
                                </TableCell>
                            </TableRow>
                        ) : paginatedStudents.map((student) => (
                            <StudentRow
                                key={student.StudentId}
                                student={student}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Component phân trang */}
            <TablePagination
                component="div"
                rowsPerPageOptions={[1, 3, 5, { label: 'All', value: -1 }]}
                count={students.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Rows per page:"
            />
        </Paper>
    );
};

export default StudentTable;
