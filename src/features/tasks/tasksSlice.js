import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  successMessage: null
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchTasksRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchTasksSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },

    fetchTasksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    deleteTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    updateTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    operationSuccess: (state, action) => {
      state.successMessage = action.payload;
    },

    createTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearMessage: (state) => {
      state.successMessage = null;
    }
  }
});

export const {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  createTaskRequest,
  deleteTaskRequest,
  updateTaskRequest,
  operationSuccess,
  createTaskFailure,
  clearMessage
} = tasksSlice.actions;

export default tasksSlice.reducer;