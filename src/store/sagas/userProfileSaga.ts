import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchUserProfileFailure,
  fetchUserProfileRequest,
  fetchUserProfileSuccess,
} from "../slices/userProfileSlice";
import { User } from "../types";

// API endpoints
const USER_ENDPOINT = "https://69085724b49bee95fbf32771.mockapi.io/users";

// API functions
const fetchUserProfileAPI = async (userId: string): Promise<User> => {
  const response = await fetch(`${USER_ENDPOINT}/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  return response.json();
};

// Worker Saga
function* fetchUserProfileSaga(
  action: ReturnType<typeof fetchUserProfileRequest>
): Generator<any, void, User> {
  try {
    const userProfile: User = yield call(fetchUserProfileAPI, action.payload);
    yield put(fetchUserProfileSuccess(userProfile));
  } catch (error: any) {
    yield put(fetchUserProfileFailure(error.message));
  }
}

// Watcher Saga
export function* userSagaProfile() {
  yield takeEvery(fetchUserProfileRequest.type, fetchUserProfileSaga);
}
