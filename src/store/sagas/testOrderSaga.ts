import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  getAllTestOrders,
  getTestOrderById,
  createTestOrder,
  updateTestOrder,
  deleteTestOrder,
} from '../../services/testOrderApi'
import {
  getAllTestResults,
  getTestResultById,
  createTestResult,
  updateTestResult,
  deleteTestResult,
} from '../../services/testResultApi'
import {
  fetchTestOrdersStart,
  fetchTestOrdersSuccess,
  fetchTestOrdersFailure,
  addTestOrder,
  updateTestOrder as updateTestOrderAction,
  deleteTestOrder as deleteTestOrderAction,
  fetchTestResultsStart,
  fetchTestResultsSuccess,
  fetchTestResultsFailure,
  addTestResult,
  updateTestResult as updateTestResultAction,
  deleteTestResult as deleteTestResultAction,
} from '../slices/testOrderSlice'

// Get Test Orders Saga
function* getTestOrdersSaga() {
  try {
    yield put(fetchTestOrdersStart())
    const testOrders = yield call(getAllTestOrders)
    yield put(fetchTestOrdersSuccess(testOrders))
  } catch (error: any) {
    yield put(fetchTestOrdersFailure(error.message || 'Failed to fetch test orders'))
  }
}

// Create Test Order Saga
function* createTestOrderSaga(action: PayloadAction<any>) {
  try {
    yield put(fetchTestOrdersStart())
    const newTestOrder = yield call(createTestOrder, action.payload)
    yield put(addTestOrder(newTestOrder))
    yield put(fetchTestOrdersSuccess([])) // Clear loading
  } catch (error: any) {
    yield put(fetchTestOrdersFailure(error.message || 'Failed to create test order'))
  }
}

// Update Test Order Saga
function* updateTestOrderSaga(action: PayloadAction<{ id: string; testOrder: any }>) {
  try {
    yield put(fetchTestOrdersStart())
    const updatedTestOrder = yield call(updateTestOrder, action.payload.id, action.payload.testOrder)
    yield put(updateTestOrderAction(updatedTestOrder))
    yield put(fetchTestOrdersSuccess([])) // Clear loading
  } catch (error: any) {
    yield put(fetchTestOrdersFailure(error.message || 'Failed to update test order'))
  }
}

// Delete Test Order Saga
function* deleteTestOrderSaga(action: PayloadAction<string>) {
  try {
    yield put(fetchTestOrdersStart())
    yield call(deleteTestOrder, action.payload)
    yield put(deleteTestOrderAction(action.payload))
    yield put(fetchTestOrdersSuccess([])) // Clear loading
  } catch (error: any) {
    yield put(fetchTestOrdersFailure(error.message || 'Failed to delete test order'))
  }
}

// Get Test Results Saga
function* getTestResultsSaga() {
  try {
    yield put(fetchTestResultsStart())
    const testResults = yield call(getAllTestResults)
    yield put(fetchTestResultsSuccess(testResults))
  } catch (error: any) {
    yield put(fetchTestResultsFailure(error.message || 'Failed to fetch test results'))
  }
}

// Create Test Result Saga
function* createTestResultSaga(action: PayloadAction<any>) {
  try {
    yield put(fetchTestResultsStart())
    const newTestResult = yield call(createTestResult, action.payload)
    yield put(addTestResult(newTestResult))
    yield put(fetchTestResultsSuccess([])) // Clear loading
  } catch (error: any) {
    yield put(fetchTestResultsFailure(error.message || 'Failed to create test result'))
  }
}

// Update Test Result Saga
function* updateTestResultSaga(action: PayloadAction<{ id: string; testResult: any }>) {
  try {
    yield put(fetchTestResultsStart())
    const updatedTestResult = yield call(updateTestResult, action.payload.id, action.payload.testResult)
    yield put(updateTestResultAction(updatedTestResult))
    yield put(fetchTestResultsSuccess([])) // Clear loading
  } catch (error: any) {
    yield put(fetchTestResultsFailure(error.message || 'Failed to update test result'))
  }
}

// Delete Test Result Saga
function* deleteTestResultSaga(action: PayloadAction<string>) {
  try {
    yield put(fetchTestResultsStart())
    yield call(deleteTestResult, action.payload)
    yield put(deleteTestResultAction(action.payload))
    yield put(fetchTestResultsSuccess([])) // Clear loading
  } catch (error: any) {
    yield put(fetchTestResultsFailure(error.message || 'Failed to delete test result'))
  }
}

export function* testOrderSaga() {
  yield takeEvery('testOrders/getTestOrdersRequest', getTestOrdersSaga)
  yield takeLatest('testOrders/createTestOrderRequest', createTestOrderSaga)
  yield takeLatest('testOrders/updateTestOrderRequest', updateTestOrderSaga)
  yield takeLatest('testOrders/deleteTestOrderRequest', deleteTestOrderSaga)
  yield takeEvery('testOrders/getTestResultsRequest', getTestResultsSaga)
  yield takeLatest('testOrders/createTestResultRequest', createTestResultSaga)
  yield takeLatest('testOrders/updateTestResultRequest', updateTestResultSaga)
  yield takeLatest('testOrders/deleteTestResultRequest', deleteTestResultSaga)
}
