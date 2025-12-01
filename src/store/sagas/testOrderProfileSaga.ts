import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchTestOrdersFailure,
  fetchTestOrdersSuccess,
} from "../slices/testOrderSlice";
import { TestOrder } from "../types";
import { fetchTestOrdersRequest } from "../slices/testOrderSliceReport";

// API endpoint
const TEST_ORDER_ENDPOINT =
  "https://69085724b49bea95fbf32f71.mockapi.io/test_order";

// API function
const fetchTestOrdersAPI = async (): Promise<TestOrder[]> => {
  const response = await fetch(TEST_ORDER_ENDPOINT);
  if (!response.ok) {
    throw new Error("Failed to fetch test orders");
  }
  return response.json();
};

// Worker Saga
function* fetchTestOrdersSaga(): Generator<any, void, TestOrder[]> {
  try {
    const testOrders: TestOrder[] = yield call(fetchTestOrdersAPI);
    yield put(fetchTestOrdersSuccess(testOrders));
  } catch (error: any) {
    yield put(fetchTestOrdersFailure(error.message));
  }
}

// Watcher Saga
export function* testOrderProfileSaga() {
  yield takeEvery(fetchTestOrdersRequest.type, fetchTestOrdersSaga);
}
