import axios from 'axios';

const API_URL = 'http://localhost:8080/students';

export const studentService = {
    getAll: () => axios.get(API_URL),
    getById: (id) => axios.get(`${API_URL}/${id}`),
    create: (student) => axios.post(API_URL, student),
    update: (id, student) => axios.put(`${API_URL}/${id}`, student),
    delete: (id) => axios.delete(`${API_URL}/${id}`)
};