import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getTasksApi = () =>
  axios.get(`${BASE_URL}/tasks`);

export const createTaskApi = (data) =>
  axios.post(`${BASE_URL}/tasks`, data);

export const deleteTaskApi = (id) =>
  axios.delete(`${BASE_URL}/tasks/${id}`);

export const updateTaskApi = (id, data) =>
  axios.put(`${BASE_URL}/tasks/${id}`, data);