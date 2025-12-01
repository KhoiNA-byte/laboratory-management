import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TestOrderWithUser } from "../../services/testOrderApi";

interface TestOrderState {
  testOrdersWithUser: TestOrderWithUser[];
  loading: boolean;
  error: string | null;
}

const initialState: TestOrderState = {
  testOrdersWithUser: [],
  loading: false,
  error: null,
};

const testOrderSlice = createSlice({
  name: "testOrders",
  initialState,
  reducers: {
    // Fetch test orders with user (Real API)
    fetchTestOrdersRequest: (
      state,
      action: PayloadAction<{ userRole: string; userId: string }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    fetchTestOrdersWithUserSuccess: (
      state,
      action: PayloadAction<TestOrderWithUser[]>
    ) => {
      state.loading = false;
      state.testOrdersWithUser = action.payload;
      state.error = null;
    },
    fetchTestOrdersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete test order (Real API)
    deleteTestOrderRequest: (state, action: PayloadAction<string>) => {
      // Trigger saga
    },
    deleteTestOrderSuccess: (state, action: PayloadAction<string>) => {
      state.testOrdersWithUser = state.testOrdersWithUser.filter(
        (order) => order.orderNumber !== action.payload
      );
    },
    fetchUserTestOrdersRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
  },
});

export const {
  fetchTestOrdersRequest,
  fetchTestOrdersWithUserSuccess,
  fetchTestOrdersFailure,
  deleteTestOrderRequest,
  deleteTestOrderSuccess,
} = testOrderSlice.actions;
export default testOrderSlice.reducer;
