import { expectSaga } from "redux-saga-test-plan";
import axios from "axios";
import { runTestRequest, runTestSuccess } from "../../slices/testResultsSlice";
import { runTestSaga } from "../testResultsSaga";
import { API_BASE_URL } from "../../../services/apiConfig";

jest.mock("axios");
const mockedAxios: any = axios;

describe("runTestSaga", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("runs test, posts test_results and dispatches runTestSuccess", async () => {
    const orderId = "1";
    const instrumentId = "inst-1";

    // Mock findOrderByIdAsync internal calls:
    // first attempt in findOrderByIdAsync is GET `${API_BASE_URL}/test_orders/${id}`
    mockedAxios.get.mockImplementation((url: string) => {
      if (url.includes(`/test_orders/${orderId}`)) {
        return Promise.resolve({
          data: { id: orderId, userId: "7", run_id: null, created_at: new Date().toISOString() },
        });
      }
      if (url.includes(`/instruments/`)) {
        // instrument metadata used inside runTestSaga
        return Promise.resolve({ data: { id: instrumentId, name: "MockInst", supportedReagents: [] } });
      }
      // fallback returns empty lists
      return Promise.resolve({ data: [] });
    });

    // mock POST for /test_results -> return created object with id
    mockedAxios.post.mockImplementation((url: string, body?: any) => {
      if (url.includes("/test_results")) {
        return Promise.resolve({ data: { id: "tr-1", run_id: body?.run_id ?? "r1" } });
      }
      // comments and rows etc fallback
      return Promise.resolve({ data: {} });
    });

    await expectSaga(runTestSaga, { type: runTestRequest.type, payload: { orderId, instrumentId } })
      .put.like({ action: { type: runTestSuccess.type } })
      .run();
  });
});
