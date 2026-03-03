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
      state.successMessage = "Task added successfully!";
    },

    fetchTasksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
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
  createTaskFailure,
  clearMessage
} = tasksSlice.actions;

export default tasksSlice.reducer;