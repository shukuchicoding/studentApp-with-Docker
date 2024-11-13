// components/SearchBar.js
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { searchStudents } from '../services/studentService';

const SearchBar = ({ setSearchResults }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async (e) => {
        setSearchQuery(e.target.value)
        if (searchQuery.trim() === '') {
            setSearchResults([]); // Trả về mảng trống nếu không có input
        } else {
            // Gọi API tìm kiếm và trả về kết quả
            const result = await searchStudents(searchQuery);
            setSearchResults(result);
        }
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <TextField
                label="Search by Student ID or Name"
                variant="outlined"
                value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                onChange={handleSearch}
                style={{ width: '50%', marginRight: '10px' }}
            />
            {/* <Button variant="contained" color="primary" onClick={handleSearch}>
                Search
            </Button> */}
        </div>
    );
};

export default SearchBar;
