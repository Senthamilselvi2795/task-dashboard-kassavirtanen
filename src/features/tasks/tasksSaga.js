import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  createTaskRequest,
  createTaskSuccess,
  createTaskFailure
} from "./tasksSlice";
import { getTasksApi, createTaskApi } from "./tasksApi";

function* fetchTasks() {
  try {
    const response = yield call(getTasksApi);
    yield put(fetchTasksSuccess(response.data));
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

function* createTask(action) {
  try {
    const response = yield call(createTaskApi, action.payload);
    yield put(createTaskSuccess(response.data));
  } catch (error) {
    yield put(createTaskFailure(error.message));
  }
}

export default function* tasksSaga() {
  yield takeLatest(fetchTasksRequest.type, fetchTasks);
  yield takeLatest(createTaskRequest.type, createTask);
}