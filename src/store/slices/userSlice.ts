import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  createSuccess: boolean;
  updateSuccess: boolean;
  successMessage: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  createSuccess: false,
  updateSuccess: false,
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

    // Fetch
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

    // Create
    createUserRequest: (state, _action: PayloadAction<User>) => {
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

    // Update
    updateUserRequest: (state, action: PayloadAction<User>) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      const idx = state.users.findIndex((u) => u.id === action.payload.id);
      if (idx !== -1) {
        // Properly update the user with all fields including status
        state.users[idx] = { ...state.users[idx], ...action.payload };
      }
      state.updateSuccess = true;
      state.successMessage = `User ${
        action.payload.status === "active" ? "activated" : "deactivated"
      } successfully!`;
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.updateSuccess = false;
    },
  },
});

export const {
  clearMessages,
  clearCreateSuccess,
  clearUpdateSuccess,
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
