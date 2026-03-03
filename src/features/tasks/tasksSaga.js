import { call, put, takeLatest, delay } from "redux-saga/effects";
import {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  createTaskRequest,
  deleteTaskRequest,
  updateTaskRequest,
  operationSuccess,
  createTaskFailure
} from "./tasksSlice";

import {
  getTasksApi,
  createTaskApi,
  deleteTaskApi,
  updateTaskApi
} from "./tasksApi";

// FETCH TASKS
function* fetchTasks() {
  try {
    yield delay(400);
    const response = yield call(getTasksApi);
    yield put(fetchTasksSuccess(response.data));
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

// CREATE TASK
function* createTask(action) {
  try {
    yield delay(400);

    const newTask = {
      ...action.payload,
      createdAt: new Date().toISOString()
    };

    yield call(createTaskApi, newTask);

    const response = yield call(getTasksApi);
    yield put(fetchTasksSuccess(response.data));

    yield put(operationSuccess("Task created successfully"));
  } catch (error) {
    yield put(createTaskFailure(error.message));
  }
}

// DELETE TASK
function* deleteTask(action) {
  try {
    yield call(deleteTaskApi, action.payload);

    const response = yield call(getTasksApi);
    yield put(fetchTasksSuccess(response.data));

    yield put(operationSuccess("Task deleted successfully"));
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

// UPDATE TASK
function* updateTask(action) {
  try {
    yield call(
      updateTaskApi,
      action.payload.id,
      action.payload.data
    );

    const response = yield call(getTasksApi);
    yield put(fetchTasksSuccess(response.data));

    yield put(operationSuccess("Task updated successfully"));
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

export default function* tasksSaga() {
  yield takeLatest(fetchTasksRequest.type, fetchTasks);
  yield takeLatest(createTaskRequest.type, createTask);
  yield takeLatest(deleteTaskRequest.type, deleteTask);
  yield takeLatest(updateTaskRequest.type, updateTask);
}