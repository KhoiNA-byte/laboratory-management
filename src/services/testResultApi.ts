// src/services/testResultApi.ts
import { TEST_RESULTS_ENDPOINT } from './apiConfig';

export interface TestResult {
  id?: string;
  resultId?: string;
  test_result_rows_id?: string[];
  test_orderId?: string | null;
  run_id?: string;
  instrument_id?: string;
  performed_by?: string | null;
  performed_at?: string;
  status?: string;
  raw_hl7?: string;
  parsed_obx?: Record<string, any>;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

// GET all test results
export const getAllTestResults = async (): Promise<TestResult[]> => {
  try {
    const response = await fetch(TEST_RESULTS_ENDPOINT);
    if (!response.ok) {
      throw new Error(`Failed to fetch test results: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching test results:', error);
    throw error;
  }
};

// GET test result by ID
export const getTestResultById = async (id: string): Promise<TestResult> => {
  try {
    const response = await fetch(`${TEST_RESULTS_ENDPOINT}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch test result: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching test result ${id}:`, error);
    throw error;
  }
};

// POST create new test result
export const createTestResult = async (testResult: Omit<TestResult, 'id' | 'createdAt' | 'updatedAt'>): Promise<TestResult> => {
  try {
    const response = await fetch(TEST_RESULTS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testResult),
    });
    if (!response.ok) {
      throw new Error(`Failed to create test result: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating test result:', error);
    throw error;
  }
};

// PUT update test result
export const updateTestResult = async (id: string, testResult: Partial<TestResult>): Promise<TestResult> => {
  try {
    const response = await fetch(`${TEST_RESULTS_ENDPOINT}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testResult),
    });
    if (!response.ok) {
      throw new Error(`Failed to update test result: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating test result ${id}:`, error);
    throw error;
  }
};

// DELETE test result
export const deleteTestResult = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${TEST_RESULTS_ENDPOINT}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete test result: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting test result ${id}:`, error);
    throw error;
  }
};

