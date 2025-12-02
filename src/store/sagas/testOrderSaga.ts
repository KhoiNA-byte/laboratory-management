import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  getListTestOrder,
  deleteTestOrder as deleteTestOrderAPI,
} from "../../services/testOrderApi";
import {
  fetchTestOrdersRequest,
  fetchTestOrdersWithUserSuccess,
  fetchTestOrdersFailure,
  deleteTestOrderRequest,
  deleteTestOrderSuccess,
} from "../slices/testOrderSlice";

// Fetch Test Orders with User Saga
function* fetchTestOrdersWithUserSaga(
  action: PayloadAction<{ userRole: string; userId: string }>
) {
  try {
    const { userRole, userId } = action.payload;
    
    console.log("fetchTestOrdersWithUserSaga called with:", { userRole, userId });
    
    // Call API
    const result: any = yield call(getListTestOrder, userRole, userId);

    if (result.success) {
      console.log("Fetch test orders success:", result.data);
      // Dispatch success action with data
      yield put(fetchTestOrdersWithUserSuccess(result.data));
    } else {
      console.error("Fetch test orders failed:", result.message);
      // Dispatch failure action with error message
      yield put(
        fetchTestOrdersFailure(result.message || "Failed to fetch test orders")
      );
    }
  } catch (error: any) {
    console.error("Error in fetchTestOrdersWithUserSaga:", error);
    // Handle unexpected errors
    yield put(
      fetchTestOrdersFailure(error.message || "An unexpected error occurred")
    );
  }
}

// Delete Test Order Saga
function* deleteTestOrderWithUserSaga(action: PayloadAction<string>) {
  try {
    const orderNumber = action.payload;
    
    console.log("deleteTestOrderWithUserSaga called with orderNumber:", orderNumber);

    // Call API
    const result: any = yield call(deleteTestOrderAPI, orderNumber);

    if (result.success) {
      console.log("Delete test order success:", orderNumber);
      // Dispatch success action
      yield put(deleteTestOrderSuccess(orderNumber));
    } else {
      console.error("Delete test order failed:", result.message);
      // Dispatch failure action
      yield put(
        fetchTestOrdersFailure(result.message || "Failed to delete test order")
      );
    }
  } catch (error: any) {
    console.error("Error in deleteTestOrderWithUserSaga:", error);
    yield put(
      fetchTestOrdersFailure(
        error.message || "An error occurred while deleting"
      )
    );
  }
}

export function* testOrdersSaga() {
  // Real API sagas
  yield takeLatest(fetchTestOrdersRequest.type, fetchTestOrdersWithUserSaga);
  yield takeLatest(deleteTestOrderRequest.type, deleteTestOrderWithUserSaga);
}
