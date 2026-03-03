import { call, put, takeLatest, delay } from "redux-saga/effects";
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
    yield delay(500);
    const response = yield call(getTasksApi);
    yield put(fetchTasksSuccess(response.data));
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

function* createTask(action) {
  try {
    // simulate real API delay
    yield delay(800);

    // create task
    yield call(createTaskApi, action.payload);

    // fetch updated tasks
    const response = yield call(getTasksApi);

    yield put(fetchTasksSuccess(response.data));

  } catch (error) {
    yield put(createTaskFailure(error.message));
  }
}

export default function* tasksSaga() {
  yield takeLatest(fetchTasksRequest.type, fetchTasks);
  yield takeLatest(createTaskRequest.type, createTask);
}