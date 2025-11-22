import {
  formatAgeInput,
  formatPhoneInput,
  convertDatePickerToDisplay,
  formatDateInput,
  convertDisplayToDatePicker,
  getTodayFormatted,
} from "../../utils/helpers";

describe("Helper Utils", () => {
  test("formatPhoneInput limits to 10 digits", () => {
    expect(formatPhoneInput("090123456789")).toBe("0901234567");
    expect(formatPhoneInput("abc")).toBe("");
  });

  test("formatDateInput adds slashes automatically", () => {
    expect(formatDateInput("01012025")).toBe("01/01/2025");
    expect(formatDateInput("12")).toBe("12/");
  });

  test("convertDatePickerToDisplay", () => {
    expect(convertDatePickerToDisplay("2025-01-30")).toBe("01/30/2025");
  });

  test("convertDisplayToDatePicker", () => {
    expect(convertDisplayToDatePicker("01/30/2025")).toBe("2025-01-30");
  });

  test("getTodayFormatted returns valid MM/DD/YYYY", () => {
    const today = getTodayFormatted();
    expect(today).toMatch(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/);
  });
});
