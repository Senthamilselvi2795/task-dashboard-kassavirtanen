import axios from "axios";

const BASE_URL = "https://your-api-url.com";

export const getTasksApi = () => axios.get(`${BASE_URL}/tasks`);

export const createTaskApi = (data) =>
  axios.post(`${BASE_URL}/tasks`, data);