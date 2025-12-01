// sagas/testOrderSaga.js
import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchTestOrdersSuccess,
  fetchTestOrdersFailure,
} from "../slices/testOrderSlice"; // Import actions từ slice

// API endpoint trực tiếp
const TEST_ORDER_ENDPOINT =
  "https://69085724b49bea95fbf32f71.mockapi.io/test_order";

// Hàm fetch API đơn giản
const fetchTestOrdersAPI = () => {
  return fetch(TEST_ORDER_ENDPOINT).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

// Worker Saga
function* fetchTestOrdersSaga() {
  try {
    const testOrders = yield call(fetchTestOrdersAPI);

    yield put(fetchTestOrdersSuccess(testOrders)); // Sử dụng action từ slice
  } catch (error) {
    console.error("Error in fetchTestOrdersSaga:", error);

    yield put(fetchTestOrdersFailure(error.message)); // Sử dụng action từ slice
  }
}

export function* testOrderSaga() {
  // Đổi tên thành testOrderSaga
  yield takeEvery("testOrder/fetchTestOrdersRequest", fetchTestOrdersSaga); // Sử dụng action type đúng format
}
