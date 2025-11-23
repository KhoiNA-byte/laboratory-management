import { vi, describe, test, expect, beforeEach } from "vitest";

// Mock config - SỬA jest thành vi
vi.mock("../../services/apiConfig", () => ({
  API_BASE_URL: "http://mock-api.com",
  USERS_ENDPOINT: "http://mock-api.com/users",
}));

import * as api from "../../services/testOrderApi";

// Mock Global Fetch
global.fetch = vi.fn();
const mockFetch = global.fetch as any;

beforeEach(() => {
  mockFetch.mockClear();
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("TestOrder API Service", () => {
  test("getTestTypes calls correct endpoint", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: "1", name: "Blood Test" }],
    });

    const result = await api.getTestTypes();
    expect(result.success).toBe(true);
    expect(result.data[0].name).toBe("Blood Test");
  });

  test("createUserId increments ID correctly", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ userId: "99" }],
    });
    const newId = await api.createUserId();
    expect(newId).toBe("100");
  });

  test("addTestOrder handles flow for new user", async () => {
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: async () => [{ userId: "10" }] }) // Get ID
      .mockResolvedValueOnce({ ok: true, json: async () => ({ userId: "11" }) }) // Create User
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: "ORD-1" }) }); // Create Order

    const formData = {
      patientName: "New",
      phoneNumber: "090",
      testType: "A",
      age: "20",
      gender: "Male",
      status: "Pending",
      createDate: "",
      note: "",
      runDate: "",
    };

    const result = await api.addTestOrder(formData, null);
    expect(result.success).toBe(true);
    expect(result.userId).toBe("11");
  });
});
