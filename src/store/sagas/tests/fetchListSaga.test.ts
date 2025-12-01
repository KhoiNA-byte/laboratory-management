import { expectSaga } from "redux-saga-test-plan";
import axios from "axios";
import { fetchListSuccess } from "../../slices/testResultsSlice";
import { fetchListSaga } from "../testResultsSaga"; // after you export it
import { API_BASE_URL } from "../../../services/apiConfig";

jest.mock("axios");
const mockedAxios: any = axios;
describe("fetchListSaga", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("dispatches fetchListSuccess when orders/results/users present", async () => {
    // prepare fake data
    const orders = [
      {
        id: "10",
        userId: "7",
        run_id: null,
        created_at: "2025-11-17T02:29:14.553Z",
      },
    ];
    const results = [
      {
        id: "r1",
        run_id: "run-x",
        status: "Completed",
        performed_at: "2025-11-17T03:00:00.000Z",
        userId: "4",
      },
    ];
    const users = [
      { id: "7", userId: "7", name: "abc" },
      { id: "4", userId: "4", name: "Bao" },
    ];

    mockedAxios.get.mockImplementation((url: string) => {
      if (url.includes("/test_results")) {
        return Promise.resolve({ data: results });
      }
      if (url.includes("/test_orders")) {
        // fetchAllOrdersAsync tries /test_orders first
        return Promise.resolve({ data: orders });
      }
      if (url.endsWith("/user")) {
        return Promise.resolve({ data: users });
      }
      // fallback
      return Promise.resolve({ data: [] });
    });

    await expectSaga(fetchListSaga)
      .put.like({ action: { type: fetchListSuccess.type } })
      .run();
  });
});
