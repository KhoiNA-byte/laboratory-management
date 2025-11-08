// src/services/reagentApi.ts
import { REAGENTS_ENDPOINT } from './apiConfig';

export interface Reagent {
  id?: string;
  name: string;
  lot_number: string;
  manufacturer: string;
  quantity: number;
  unit: string;
  usage_per_run: number;
  expiry_date: string;
  location: string;
  min_stock: number;
  max_stock: number;
  cost: number;
  typeCbc?: any[];
  typeCbcs?: string[];
  instrumentId?: string | null;
  created_at?: number;
  updated_at?: number;
}

// GET all reagents
export const getAllReagents = async (): Promise<Reagent[]> => {
  try {
    const response = await fetch(REAGENTS_ENDPOINT);
    if (!response.ok) {
      throw new Error(`Failed to fetch reagents: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching reagents:', error);
    throw error;
  }
};

// GET reagent by ID
export const getReagentById = async (id: string): Promise<Reagent> => {
  try {
    const response = await fetch(`${REAGENTS_ENDPOINT}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch reagent: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching reagent ${id}:`, error);
    throw error;
  }
};

// POST create new reagent
export const createReagent = async (reagent: Omit<Reagent, 'id' | 'created_at' | 'updated_at'>): Promise<Reagent> => {
  try {
    const response = await fetch(REAGENTS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reagent),
    });
    if (!response.ok) {
      throw new Error(`Failed to create reagent: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating reagent:', error);
    throw error;
  }
};

// PUT update reagent
export const updateReagent = async (id: string, reagent: Partial<Reagent>): Promise<Reagent> => {
  try {
    const response = await fetch(`${REAGENTS_ENDPOINT}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reagent),
    });
    if (!response.ok) {
      throw new Error(`Failed to update reagent: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating reagent ${id}:`, error);
    throw error;
  }
};

// DELETE reagent
export const deleteReagent = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${REAGENTS_ENDPOINT}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete reagent: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting reagent ${id}:`, error);
    throw error;
  }
};

