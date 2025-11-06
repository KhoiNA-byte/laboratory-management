import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../services/userApi";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
  deleteSuccess: boolean;
  successMessage: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
  successMessage: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Clear messages
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
      state.createSuccess = false;
      state.updateSuccess = false;
      state.deleteSuccess = false;
    },

    // Clear specific success
    clearCreateSuccess: (state) => {
      state.createSuccess = false;
      state.successMessage = null;
    },
    clearUpdateSuccess: (state) => {
      state.updateSuccess = false;
      state.successMessage = null;
    },
    clearDeleteSuccess: (state) => {
      state.deleteSuccess = false;
      state.successMessage = null;
    },

    // Fetch users
    getUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.users = action.payload;
    },
    getUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create user
    createUserRequest: (
      state,
      _action: PayloadAction<Omit<User, "id" | "createdAt" | "updatedAt">>
    ) => {
      state.loading = true;
      state.error = null;
      state.createSuccess = false;
    },
    createUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.users.push(action.payload);
      state.createSuccess = true;
      state.successMessage = "User created successfully!";
    },
    createUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.createSuccess = false;
    },

    // Update user
    updateUserRequest: (state, _action: PayloadAction<User>) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
      state.updateSuccess = true;
      state.successMessage = "User updated successfully!";
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.updateSuccess = false;
    },

    // Delete user
    deleteUserRequest: (state, _action: PayloadAction<{ id: string; userId?: string }>) => {
      state.loading = true;
      state.error = null;
      state.deleteSuccess = false;
    },
    deleteUserSuccess: (state, action: PayloadAction<{ id: string }>) => {
      state.loading = false;
      state.users = state.users.filter((u) => u.id !== action.payload.id);
      state.deleteSuccess = true;
      state.successMessage = "User deleted successfully!";
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.deleteSuccess = false;
    },
  },
});

export const {
  clearMessages,
  clearCreateSuccess,
  clearUpdateSuccess,
  clearDeleteSuccess,
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
