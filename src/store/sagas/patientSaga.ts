import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} from '../../services/patientApi'
import {
  fetchPatientsStart,
  fetchPatientsSuccess,
  fetchPatientsFailure,
  addPatient,
  updatePatient as updatePatientAction,
  deletePatient as deletePatientAction,
} from '../slices/patientSlice'

// Get Patients Saga
function* getPatientsSaga() {
  try {
    yield put(fetchPatientsStart())
    const patients = yield call(getAllPatients)
    yield put(fetchPatientsSuccess(patients))
  } catch (error: any) {
    yield put(fetchPatientsFailure(error.message || 'Failed to fetch patients'))
  }
}

// Get Patient By ID Saga
function* getPatientByIdSaga(action: PayloadAction<string>) {
  try {
    yield put(fetchPatientsStart())
    const patient = yield call(getPatientById, action.payload)
    yield put(fetchPatientsSuccess([patient]))
  } catch (error: any) {
    yield put(fetchPatientsFailure(error.message || 'Failed to fetch patient'))
  }
}

// Create Patient Saga
function* createPatientSaga(action: PayloadAction<any>) {
  try {
    yield put(fetchPatientsStart())
    const newPatient = yield call(createPatient, action.payload)
    yield put(addPatient(newPatient))
    yield put(fetchPatientsSuccess([])) // Clear loading
  } catch (error: any) {
    yield put(fetchPatientsFailure(error.message || 'Failed to create patient'))
  }
}

// Update Patient Saga
function* updatePatientSaga(action: PayloadAction<{ id: string; patient: any }>) {
  try {
    yield put(fetchPatientsStart())
    const updatedPatient = yield call(updatePatient, action.payload.id, action.payload.patient)
    yield put(updatePatientAction(updatedPatient))
    yield put(fetchPatientsSuccess([])) // Clear loading
  } catch (error: any) {
    yield put(fetchPatientsFailure(error.message || 'Failed to update patient'))
  }
}

// Delete Patient Saga
function* deletePatientSaga(action: PayloadAction<string>) {
  try {
    yield put(fetchPatientsStart())
    yield call(deletePatient, action.payload)
    yield put(deletePatientAction(action.payload))
    yield put(fetchPatientsSuccess([])) // Clear loading
  } catch (error: any) {
    yield put(fetchPatientsFailure(error.message || 'Failed to delete patient'))
  }
}

export function* patientSaga() {
  yield takeEvery('patients/getPatientsRequest', getPatientsSaga)
  yield takeEvery('patients/getPatientByIdRequest', getPatientByIdSaga)
  yield takeLatest('patients/createPatientRequest', createPatientSaga)
  yield takeLatest('patients/updatePatientRequest', updatePatientSaga)
  yield takeLatest('patients/deletePatientRequest', deletePatientSaga)
}
