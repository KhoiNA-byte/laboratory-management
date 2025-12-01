import { expectSaga } from "redux-saga-test-plan";
import axios from "axios";
import { fetchDetailRequest, fetchDetailSuccess, fetchDetailFailure } from "../../slices/testResultsSlice";
import { fetchDetailSaga } from "../testResultsSaga"; // ensure fetchDetailSaga is exported
// jest mock
jest.mock("axios");
const mockedAxios: any = axios;

describe("fetchDetailSaga", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("dispatches fetchDetailSuccess when result and rows/comments exist", async () => {
    const runId = "run-x";

    // fake test_result returned by /test_results?run_id=run-x or by id
    const testResult = {
      id: "r1",
      run_id: runId,
      patientName: "abc",
      performed_at: "2025-11-17T03:00:00.000Z",
      rows: undefined, // force saga to fetch rows from /test_result_rows
      comments: [],
    };

    const rows = [
      { id: "rr1", run_id: runId, parameter_name: "WBC", result_value: "6000", flag: "Normal" },
    ];

    const comments = [
      { id: "c1", run_id: runId, comments: [{ text: "ok", author: "lab" }] },
    ];

    mockedAxios.get.mockImplementation((url: string) => {
      if (url.includes("/test_results?run_id=") || url.includes(`/test_results/${encodeURIComponent(runId)}`)) {
        return Promise.resolve({ data: [testResult] });
      }
      if (url.includes("/test_result_rows?run_id=")) {
        return Promise.resolve({ data: rows });
      }
      if (url.includes("/comments?run_id=")) {
        return Promise.resolve({ data: comments });
      }
      // fallback: empty
      return Promise.resolve({ data: [] });
    });

    await expectSaga(fetchDetailSaga, fetchDetailRequest(runId))
      .put.like({ action: { type: fetchDetailSuccess.type } })
      .run();
  });

  it("dispatches fetchDetailFailure when no result found", async () => {
    const runId = "not-found";

    mockedAxios.get.mockImplementation(() => Promise.resolve({ data: [] }));

    await expectSaga(fetchDetailSaga, fetchDetailRequest(runId))
      .put.actionType(fetchDetailFailure.type)
      .run();
  });
});
