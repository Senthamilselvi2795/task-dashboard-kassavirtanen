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
    // Step 1: Create task in API
    yield call(createTaskApi, action.payload);

    // Step 2: Fetch latest tasks from API
    const response = yield call(getTasksApi);

    // Step 3: Update redux store with fresh data
    yield put(fetchTasksSuccess(response.data));

  } catch (error) {
    yield put(createTaskFailure(error.message));
  }
}

export default function* tasksSaga() {
  yield takeLatest(fetchTasksRequest.type, fetchTasks);
  yield takeLatest(createTaskRequest.type, createTask);
}