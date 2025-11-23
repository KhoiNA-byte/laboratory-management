// @ts-nocheck
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, test, expect, beforeEach } from "vitest";
import UpdateTestOrderPage from "../../modules/testorder/UpdateTestOrderPage";
import * as api from "../../services/testOrderApi";

vi.mock("../../services/testOrderApi");

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...(actual as any),
    useNavigate: () => mockNavigate,
    useParams: () => ({ orderId: "123" }),
  };
});

describe("UpdateTestOrderPage", () => {
  const mockOrder = {
    id: "123",
    patientName: "B",
    patientPhone: "090",
    testType: "Ultrasound",
    status: "Pending",
    priority: "Routine",
    testerName: "Dr. House",
    createdAt: "01/01/2025",
    ordered: "01/01/2025",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (api.getTestOrderDetailById as any).mockResolvedValue({
      success: true,
      data: mockOrder,
    });
  });

  test("Renders correctly", async () => {
    render(
      <MemoryRouter>
        <UpdateTestOrderPage />
      </MemoryRouter>
    );
    await waitFor(() => screen.getByDisplayValue("B"));

    expect(screen.getByDisplayValue("B")).toBeDisabled(); // Readonly
    expect(screen.getByDisplayValue("Ultrasound")).not.toBeDisabled(); // Editable
  });

  test("Submits update", async () => {
    (api.updateTestOrderById as any).mockResolvedValue({ success: true });
    render(
      <MemoryRouter>
        <UpdateTestOrderPage />
      </MemoryRouter>
    );
    await waitFor(() => screen.getByDisplayValue("Pending"));

    fireEvent.change(screen.getByDisplayValue("Pending"), {
      target: { value: "Completed" },
    });

    // SỬA DÒNG NÀY
    const updateButton = screen.getByRole("button", {
      name: /update test order/i,
    });
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(api.updateTestOrderById).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/admin/test-orders");
    });
  });
});
