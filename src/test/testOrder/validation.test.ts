import {
  validatePatientName,
  validateAge,
  validateGender,
  validatePhoneNumber,
  validateTester,
  validateTestType,
  validateRunDate,
} from "../../utils/validation";

describe("Validation Utils", () => {
  test("validatePhoneNumber", () => {
    expect(validatePhoneNumber("")).toBe("Phone number is required");
    expect(validatePhoneNumber("123")).toBe(
      "Phone number must be exactly 10 digits"
    );
    expect(validatePhoneNumber("090123456a")).toBe(
      "Phone number must contain only digits"
    );
    expect(validatePhoneNumber("0901234567")).toBe("");
  });

  test("validateRunDate", () => {
    const createDate = "01/10/2025"; // MM/DD/YYYY

    // Case lỗi
    expect(validateRunDate("", createDate)).toBe("Run date is required");
    expect(validateRunDate("2025-01-15", createDate)).toBe(
      "Date must be in MM/DD/YYYY format"
    );
    expect(validateRunDate("01/09/2025", createDate)).toBe(
      "Run date must be after or equal to create date"
    );

    // Case đúng
    expect(validateRunDate("01/15/2025", createDate)).toBe("");
  });

  test("validateBasicFields", () => {
    expect(validatePatientName("")).toBe("Patient name is required");
    expect(validateAge("-5")).toBe("Age cannot be negative");
    expect(validateGender("")).toBe("Gender is required");
    expect(validateTester("")).toBe("Tester is required");
    expect(validateTestType("")).toBe("Test type is required");
  });
});
