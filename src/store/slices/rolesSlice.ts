import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Role } from '../../services/rolesApi'

interface RolesState {
  roles: Role[]
  loading: boolean
  error: string | null
}

const initialState: RolesState = {
  roles: [],
  loading: false,
  error: null,
}

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    fetchRolesStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchRolesSuccess: (state, action: PayloadAction<Role[]>) => {
      state.loading = false
      state.roles = action.payload
      state.error = null
    },
    fetchRolesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    addRole: (state, action: PayloadAction<Role>) => {
      state.roles.push(action.payload)
    },
    updateRole: (state, action: PayloadAction<Role>) => {
      const index = state.roles.findIndex(role => role.id === action.payload.id)
      if (index !== -1) {
        state.roles[index] = action.payload
      }
    },
    deleteRole: (state, action: PayloadAction<string>) => {
      state.roles = state.roles.filter(role => role.id !== action.payload)
    },
  },
})

export const {
  fetchRolesStart,
  fetchRolesSuccess,
  fetchRolesFailure,
  addRole,
  updateRole,
  deleteRole,
} = rolesSlice.actions
export default rolesSlice.reducer

