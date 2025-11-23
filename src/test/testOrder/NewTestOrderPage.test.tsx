import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, test, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import NewTestOrderPage from "../../modules/testorder/NewTestOrderPage";
import * as api from "../../services/testOrderApi";

// Mock đúng đường dẫn
vi.mock("../../services/testOrderApi");

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...(actual as any),
    useNavigate: () => mockNavigate,
  };
});

describe("NewTestOrderPage Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (api.getTestTypes as any).mockResolvedValue({
      success: true,
      data: [{ id: "1", name: "Blood Test" }],
    });
  });

  test("Validates Phone Number Input", async () => {
    render(
      <MemoryRouter>
        <NewTestOrderPage />
      </MemoryRouter>
    );
    const phoneInput = screen.getByPlaceholderText(/Enter phone number/i);

    await userEvent.type(phoneInput, "abc");
    expect(phoneInput).toHaveValue("");

    await userEvent.type(phoneInput, "0901234567");
    expect(phoneInput).toHaveValue("0901234567");
  });

  test("Full Submit Flow", async () => {
    const mockUser = { userId: "U1", name: "A", age: 30, gender: "Male" };
    (api.getUserByPhoneNumber as any).mockResolvedValue(mockUser); // SỬA jest.Mock thành any
    (api.addTestOrder as any).mockResolvedValue({ success: true }); // SỬA jest.Mock thành any

    render(
      <MemoryRouter>
        <NewTestOrderPage />
      </MemoryRouter>
    );

    // Search
    await userEvent.type(
      screen.getByPlaceholderText(/Enter phone number/i),
      "0901234567"
    );
    fireEvent.click(screen.getByText("Search"));
    await waitFor(() =>
      expect(screen.getByDisplayValue("A")).toBeInTheDocument()
    );

    // Select Type - SỬA ĐOẠN NÀY ĐỂ TRÁNH LỖI MULTIPLE COMBOBOX
    await waitFor(() => screen.getByText("Blood Test"));

    // Thay vì dùng getByRole("combobox") chung chung, chọn combobox cụ thể
    const testTypeSelect = screen.getByDisplayValue("Select test type");
    fireEvent.change(testTypeSelect, { target: { value: "1" } });

    // Enter Date & Submit
    await userEvent.type(
      screen.getByPlaceholderText("MM/DD/YYYY"),
      "12/12/2099"
    ); // SỬA ĐỊNH DẠNG DATE
    const createBtn = screen.getByText("Create");
    expect(createBtn).toBeEnabled();
    fireEvent.click(createBtn);

    await waitFor(() => {
      expect(api.addTestOrder).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/admin/test-orders");
    });
  });
});
