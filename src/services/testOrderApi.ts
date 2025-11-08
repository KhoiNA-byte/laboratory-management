// src/services/testOrderApi.ts
import { TEST_ORDER_ENDPOINT } from './apiConfig';

export interface TestOrder {
  id?: string;
  run_id?: string;
  testType: string;
  patientId?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

// GET all test orders
export const getAllTestOrders = async (): Promise<TestOrder[]> => {
  try {
    const response = await fetch(TEST_ORDER_ENDPOINT);
    if (!response.ok) {
      throw new Error(`Failed to fetch test orders: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching test orders:', error);
    throw error;
  }
};

// GET test order by ID
export const getTestOrderById = async (id: string): Promise<TestOrder> => {
  try {
    const response = await fetch(`${TEST_ORDER_ENDPOINT}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch test order: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching test order ${id}:`, error);
    throw error;
  }
};

// POST create new test order
export const createTestOrder = async (testOrder: Omit<TestOrder, 'id' | 'createdAt' | 'updatedAt'>): Promise<TestOrder> => {
  try {
    const response = await fetch(TEST_ORDER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testOrder),
    });
    if (!response.ok) {
      throw new Error(`Failed to create test order: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating test order:', error);
    throw error;
  }
};

// PUT update test order
export const updateTestOrder = async (id: string, testOrder: Partial<TestOrder>): Promise<TestOrder> => {
  try {
    const response = await fetch(`${TEST_ORDER_ENDPOINT}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testOrder),
    });
    if (!response.ok) {
      throw new Error(`Failed to update test order: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating test order ${id}:`, error);
    throw error;
  }
};

// DELETE test order
export const deleteTestOrder = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${TEST_ORDER_ENDPOINT}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete test order: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting test order ${id}:`, error);
    throw error;
  }
};

