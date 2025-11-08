import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  getAllInstruments,
  getInstrumentById,
  createInstrument,
  updateInstrument,
  deleteInstrument,
} from '../../services/instrumentApi'
import {
  getAllReagents,
  getReagentById,
  createReagent,
  updateReagent,
  deleteReagent,
} from '../../services/reagentApi'
import {
  fetchInstrumentsStart,
  fetchInstrumentsSuccess,
  fetchInstrumentsFailure,
  addInstrument,
  updateInstrument as updateInstrumentAction,
  deleteInstrument as deleteInstrumentAction,
  fetchReagentsStart,
  fetchReagentsSuccess,
  fetchReagentsFailure,
  addReagent,
  updateReagent as updateReagentAction,
  deleteReagent as deleteReagentAction,
} from '../slices/instrumentSlice'

// Get Instruments Saga
function* getInstrumentsSaga() {
  try {
    yield put(fetchInstrumentsStart())
    const instruments = yield call(getAllInstruments)
    yield put(fetchInstrumentsSuccess(instruments))
  } catch (error: any) {
    yield put(fetchInstrumentsFailure(error.message || 'Failed to fetch instruments'))
  }
}

// Create Instrument Saga
function* createInstrumentSaga(action: PayloadAction<any>) {
  try {
    yield put(fetchInstrumentsStart())
    const newInstrument = yield call(createInstrument, action.payload)
    yield put(addInstrument(newInstrument))
    yield put(fetchInstrumentsSuccess([])) // Clear loading
  } catch (error: any) {
    yield put(fetchInstrumentsFailure(error.message || 'Failed to create instrument'))
  }
}

// Update Instrument Saga
function* updateInstrumentSaga(action: PayloadAction<{ id: string; instrument: any }>) {
  try {
    yield put(fetchInstrumentsStart())
    const updatedInstrument = yield call(updateInstrument, action.payload.id, action.payload.instrument)
    yield put(updateInstrumentAction(updatedInstrument))
    yield put(fetchInstrumentsSuccess([])) // Clear loading
  } catch (error: any) {
    yield put(fetchInstrumentsFailure(error.message || 'Failed to update instrument'))
  }
}

// Delete Instrument Saga
function* deleteInstrumentSaga(action: PayloadAction<string>) {
  try {
    yield put(fetchInstrumentsStart())
    yield call(deleteInstrument, action.payload)
    yield put(deleteInstrumentAction(action.payload))
    yield put(fetchInstrumentsSuccess([])) // Clear loading
  } catch (error: any) {
    yield put(fetchInstrumentsFailure(error.message || 'Failed to delete instrument'))
  }
}

// Get Reagents Saga
function* getReagentsSaga() {
  try {
    yield put(fetchReagentsStart())
    const reagents = yield call(getAllReagents)
    yield put(fetchReagentsSuccess(reagents))
  } catch (error: any) {
    yield put(fetchReagentsFailure(error.message || 'Failed to fetch reagents'))
  }
}

// Create Reagent Saga
function* createReagentSaga(action: PayloadAction<any>) {
  try {
    yield put(fetchReagentsStart())
    const newReagent = yield call(createReagent, action.payload)
    yield put(addReagent(newReagent))
    yield put(fetchReagentsSuccess([])) // Clear loading
  } catch (error: any) {
    yield put(fetchReagentsFailure(error.message || 'Failed to create reagent'))
  }
}

// Update Reagent Saga
function* updateReagentSaga(action: PayloadAction<{ id: string; reagent: any }>) {
  try {
    yield put(fetchReagentsStart())
    const updatedReagent = yield call(updateReagent, action.payload.id, action.payload.reagent)
    yield put(updateReagentAction(updatedReagent))
    yield put(fetchReagentsSuccess([])) // Clear loading
  } catch (error: any) {
    yield put(fetchReagentsFailure(error.message || 'Failed to update reagent'))
  }
}

// Delete Reagent Saga
function* deleteReagentSaga(action: PayloadAction<string>) {
  try {
    yield put(fetchReagentsStart())
    yield call(deleteReagent, action.payload)
    yield put(deleteReagentAction(action.payload))
    yield put(fetchReagentsSuccess([])) // Clear loading
  } catch (error: any) {
    yield put(fetchReagentsFailure(error.message || 'Failed to delete reagent'))
  }
}

export function* instrumentSaga() {
  yield takeEvery('instruments/getInstrumentsRequest', getInstrumentsSaga)
  yield takeLatest('instruments/createInstrumentRequest', createInstrumentSaga)
  yield takeLatest('instruments/updateInstrumentRequest', updateInstrumentSaga)
  yield takeLatest('instruments/deleteInstrumentRequest', deleteInstrumentSaga)
  yield takeEvery('instruments/getReagentsRequest', getReagentsSaga)
  yield takeLatest('instruments/createReagentRequest', createReagentSaga)
  yield takeLatest('instruments/updateReagentRequest', updateReagentSaga)
  yield takeLatest('instruments/deleteReagentRequest', deleteReagentSaga)
}
