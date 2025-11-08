// src/services/instrumentApi.ts
import { INSTRUMENTS_ENDPOINT } from './apiConfig';

export interface Instrument {
  id?: string;
  name: string;
  model: string;
  supportedTest?: string[];
  supportedReagents?: string[];
  status: string;
  location?: string;
  serialNumber?: string;
  manufacturer?: string;
  test_result_rowId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// GET all instruments
export const getAllInstruments = async (): Promise<Instrument[]> => {
  try {
    const response = await fetch(INSTRUMENTS_ENDPOINT);
    if (!response.ok) {
      throw new Error(`Failed to fetch instruments: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching instruments:', error);
    throw error;
  }
};

// GET instrument by ID
export const getInstrumentById = async (id: string): Promise<Instrument> => {
  try {
    const response = await fetch(`${INSTRUMENTS_ENDPOINT}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch instrument: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching instrument ${id}:`, error);
    throw error;
  }
};

// POST create new instrument
export const createInstrument = async (instrument: Omit<Instrument, 'id' | 'createdAt' | 'updatedAt'>): Promise<Instrument> => {
  try {
    const response = await fetch(INSTRUMENTS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(instrument),
    });
    if (!response.ok) {
      throw new Error(`Failed to create instrument: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating instrument:', error);
    throw error;
  }
};

// PUT update instrument
export const updateInstrument = async (id: string, instrument: Partial<Instrument>): Promise<Instrument> => {
  try {
    const response = await fetch(`${INSTRUMENTS_ENDPOINT}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(instrument),
    });
    if (!response.ok) {
      throw new Error(`Failed to update instrument: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating instrument ${id}:`, error);
    throw error;
  }
};

// DELETE instrument
export const deleteInstrument = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${INSTRUMENTS_ENDPOINT}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete instrument: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting instrument ${id}:`, error);
    throw error;
  }
};

