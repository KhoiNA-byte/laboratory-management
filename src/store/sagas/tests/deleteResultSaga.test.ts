import { expectSaga } from "redux-saga-test-plan";
import axios from "axios";
import {
  deleteResultRequest,
  deleteResultSuccess,
  deleteResultFailure,
} from "../../slices/testResultsSlice";
import { deleteResultSaga } from "../testResultsSaga"; // ensure deleteResultSaga is exported
// jest mock
jest.mock("axios");
const mockedAxios: any = axios;

describe("deleteResultSaga", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("deletes records across endpoints and dispatches deleteResultSuccess", async () => {
    const runId = "run-x";

    // mock responses for GET queries the saga tries
    mockedAxios.get.mockImplementation((url: string) => {
      // test_results?run_id=...
      if (url.includes("/test_results?run_id=")) {
        return Promise.resolve({ data: [{ id: "tr1", run_id: runId }] });
      }
      // test_result_rows?run_id=...
      if (url.includes("/test_result_rows?run_id=")) {
        return Promise.resolve({ data: [{ id: "row1", run_id: runId }] });
      }
      // comments endpoints
      if (
        url.includes("/comments?run_id=") ||
        url.includes("/test_result_comment?run_id=") ||
        url.includes("/test_result_comments?run_id=")
      ) {
        return Promise.resolve({ data: [{ id: "c1", run_id: runId }] });
      }
      // test_orders?run_id=
      if (url.includes("/test_orders?run_id=")) {
        return Promise.resolve({ data: [{ id: "o1", run_id: runId }] });
      }
      // test_order?run_id=
      if (url.includes("/test_order?run_id=")) {
        return Promise.resolve({ data: [] });
      }
      // nested per-user path: return empty list (or you can return matches)
      if (url.includes("/user")) {
        // when saga lists users it might call /user
        if (url.endsWith("/user")) {
          return Promise.resolve({ data: [{ id: "7", userId: "7" }] });
        }
        // nested user/{uid}/test_orders?run_id=
        if (url.includes("/test_orders?run_id=")) {
          return Promise.resolve({ data: [] });
        }
      }
      return Promise.resolve({ data: [] });
    });

    // mock delete to succeed
    mockedAxios.delete.mockImplementation(() => Promise.resolve({}));

    await expectSaga(deleteResultSaga, deleteResultRequest(runId))
      .put.like({ action: { type: deleteResultSuccess.type } })
      .run();
  });

  it("dispatches deleteResultFailure when delete flow throws", async () => {
    const runId = "bad";

    mockedAxios.get.mockImplementation(() =>
      Promise.reject(new Error("network"))
    );

    await expectSaga(deleteResultSaga, deleteResultRequest(runId))
      .put.actionType(deleteResultFailure.type) // expect đúng action
      .run(false); // <<< THÊM DÒNG NÀY !!!
  });
});
