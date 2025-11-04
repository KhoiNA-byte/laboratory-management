import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { mockGetUsersAPI } from "../apis/mock/userMock";

// Mock API functions
export const mockCreateUserAPI = async (data: any) => {
  await new Promise((r) => setTimeout(r, 300));
  return data;
};

const mockUpdateUserAPI = async (userData: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    ...userData,
    updatedAt: new Date().toISOString(),
  };
};

// Get Users Saga
function* getUsersSaga() {
  try {
    const users = yield call(mockGetUsersAPI);
    yield put({
      type: "users/getUsersSuccess",
      payload: users,
    });
  } catch (error: any) {
    yield put({
      type: "users/getUsersFailure",
      payload: error.message || "Failed to fetch users",
    });
  }
}

function* createUserSaga(action: PayloadAction<any>): Generator {
  try {
    const newUserData = {
      ...action.payload,
      status: "active",
      lastLogin: new Date().toISOString().split("T")[0],
    };

    const newUser = yield call(mockCreateUserAPI, newUserData);

    yield put({
      type: "users/createUserSuccess",
      payload: newUser,
    });
  } catch (error: any) {
    yield put({
      type: "users/createUserFailure",
      payload: error.message || "Failed to create user",
    });
  }
}

// Update User Saga
function* updateUserSaga(action: PayloadAction<any>): Generator {
  try {
    const updatedUser = yield call(mockUpdateUserAPI, action.payload);
    yield put({
      type: "users/updateUserSuccess",
      payload: updatedUser,
    });
  } catch (error: any) {
    yield put({
      type: "users/updateUserFailure",
      payload: error.message || "Failed to update user",
    });
  }
}

export function* userSaga() {
  yield takeEvery("users/getUsersRequest", getUsersSaga);
  yield takeLatest("users/createUserRequest", createUserSaga);
  yield takeLatest("users/updateUserRequest", updateUserSaga);
}
