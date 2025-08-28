import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getTasks = () => axios.get(`${API_URL}/tasks`);    
export const createTask = (data) => axios.post(`${API_URL}/tasks`, data);
export const updateTask = (id, data) => axios.put(`${API_URL}/tasks/${id}`, data);
export const deleteTask = (id) => axios.delete(`${API_URL}/tasks/${id}`);   