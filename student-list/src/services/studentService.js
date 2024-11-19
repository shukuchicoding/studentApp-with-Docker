import axios from 'axios';

export const getStudents = async () => {
    try {
        // const response = await axios.get("/");
        const response = await axios.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        return [];
    }
};

export const addStudent = async (student) => {
    try {
        // await axios.post("/", student);
        await axios.post('/', student);
    } catch (error) {
        console.error('Error adding student:', error);
    }
};

export const updateStudent = async (id, student) => {
    try {
        // await axios.put("/" + id, student);
        await axios.put('/' + id, student);
    } catch (error) {
        console.error('Error updating student:', error);
    }
};

export const deleteStudent = async (id) => {
    try {
        console.timeLog(id);
        await axios.delete('/' + id);
    } catch (error) {
        console.error('Error deleting student:', error);
    }
};

export const searchStudents = async (query) => {
    try {
        if (query === '') console.log("empty query")
        // const response = await axios.get("/search", {
        //     params: { query }
        // });
        const response = await axios.get('/search', {
            params: { query }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching students:', error);
        return [];
    }
};
