// slices/testOrderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TestOrderServer = {
  run_id: any;
  testType: string;
  id: string;
};

interface TestOrderState {
  list: TestOrderServer[];
  loading: boolean;
  error: string | null;
  updatingId?: string | null;
}

const initialState: TestOrderState = {
  list: [],
  loading: false,
  error: null,
  updatingId: null,
};

const testOrderSlice = createSlice({
  name: "testOrder",
  initialState,
  reducers: {
    // --- Fetch Test Orders ---
    fetchTestOrdersRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTestOrdersSuccess(state, action: PayloadAction<TestOrderServer[]>) {
      state.list = action.payload;
      state.loading = false;
    },
    fetchTestOrdersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTestOrdersRequest,
  fetchTestOrdersSuccess,
  fetchTestOrdersFailure,
} = testOrderSlice.actions;

export default testOrderSlice.reducer;
