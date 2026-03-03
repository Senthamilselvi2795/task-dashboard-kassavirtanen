import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getTasksApi = () => {
  return axios.get(`${BASE_URL}/tasks`);
};

export const createTaskApi = (data) => {
  return axios.post(`${BASE_URL}/tasks`, data);
};