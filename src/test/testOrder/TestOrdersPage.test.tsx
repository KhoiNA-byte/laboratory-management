import "@testing-library/jest-dom";
import { vi, describe, test, expect, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
  act, // THÊM ACT
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as api from "../../services/testOrderApi";
import { TestOrdersPage } from "../../modules/testorder/TestOrdersPage";

vi.mock("../../services/testOrderApi");
global.confirm = vi.fn(() => true);

describe("TestOrdersPage Dashboard", () => {
  const mockOrders = [
    {
      orderNumber: "TO-1",
      patient: "Alice",
      status: "Pending",
      ordered: "01/01/2025",
      priority: "Routine",
      testType: "A",
      doctor: "Dr.X",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (api.getListTestOrder as any).mockResolvedValue({
      success: true,
      data: mockOrders,
    });
  });

  test("Renders list and delete flow", async () => {
    (api.deleteTestOrder as any).mockResolvedValue({ success: true });

    // BỌC TRONG ACT ĐỂ TRÁNH WARNING
    await act(async () => {
      render(
        <MemoryRouter>
          <TestOrdersPage />
        </MemoryRouter>
      );
    });

    await waitFor(() => screen.getByText("Alice"));

    // Click Action Button
    const row = screen.getByText("Alice").closest("tr");
    const btn = within(row!).getByRole("button");

    await act(async () => {
      fireEvent.click(btn);
    });

    // Click Delete
    await act(async () => {
      fireEvent.click(screen.getByText("Delete Test Order"));
    });

    expect(api.deleteTestOrder).toHaveBeenCalledWith("TO-1");
  });
});
