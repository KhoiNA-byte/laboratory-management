import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from '../../services/rolesApi'
import {
  fetchRolesStart,
  fetchRolesSuccess,
  fetchRolesFailure,
  addRole,
  updateRole as updateRoleAction,
  deleteRole as deleteRoleAction,
} from '../slices/rolesSlice'

// Get Roles Saga
function* getRolesSaga() {
  try {
    yield put(fetchRolesStart())
    const roles = yield call(getAllRoles)
    yield put(fetchRolesSuccess(roles))
  } catch (error: any) {
    yield put(fetchRolesFailure(error.message || 'Failed to fetch roles'))
  }
}

// Get Role By ID Saga
function* getRoleByIdSaga(action: PayloadAction<string>) {
  try {
    yield put(fetchRolesStart())
    const role = yield call(getRoleById, action.payload)
    yield put(fetchRolesSuccess([role]))
  } catch (error: any) {
    yield put(fetchRolesFailure(error.message || 'Failed to fetch role'))
  }
}

// Create Role Saga
function* createRoleSaga(action: PayloadAction<any>) {
  try {
    yield put(fetchRolesStart())
    const newRole = yield call(createRole, action.payload)
    yield put(addRole(newRole))
    yield put(fetchRolesSuccess([])) // Clear loading
  } catch (error: any) {
    yield put(fetchRolesFailure(error.message || 'Failed to create role'))
  }
}

// Update Role Saga
function* updateRoleSaga(action: PayloadAction<{ id: string; role: any }>) {
  try {
    yield put(fetchRolesStart())
    const updatedRole = yield call(updateRole, action.payload.id, action.payload.role)
    yield put(updateRoleAction(updatedRole))
    yield put(fetchRolesSuccess([])) // Clear loading
  } catch (error: any) {
    yield put(fetchRolesFailure(error.message || 'Failed to update role'))
  }
}

// Delete Role Saga
function* deleteRoleSaga(action: PayloadAction<string>) {
  try {
    yield put(fetchRolesStart())
    yield call(deleteRole, action.payload)
    yield put(deleteRoleAction(action.payload))
    yield put(fetchRolesSuccess([])) // Clear loading
  } catch (error: any) {
    yield put(fetchRolesFailure(error.message || 'Failed to delete role'))
  }
}

export function* rolesSaga() {
  yield takeEvery('roles/getRolesRequest', getRolesSaga)
  yield takeEvery('roles/getRoleByIdRequest', getRoleByIdSaga)
  yield takeLatest('roles/createRoleRequest', createRoleSaga)
  yield takeLatest('roles/updateRoleRequest', updateRoleSaga)
  yield takeLatest('roles/deleteRoleRequest', deleteRoleSaga)
}

