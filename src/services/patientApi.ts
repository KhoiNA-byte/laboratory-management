// src/services/patientApi.ts
import { PATIENTS_ENDPOINT } from './apiConfig';

export interface Patient {
  id?: string;
  patientMRN: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  patientPhone: string;
  patientEmail: string;
  patientLastVisit: string;
  createdAt?: string;
  updatedAt?: string;
}

// GET all patients
export const getAllPatients = async (): Promise<Patient[]> => {
  try {
    const response = await fetch(PATIENTS_ENDPOINT);
    if (!response.ok) {
      throw new Error(`Failed to fetch patients: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

// GET patient by ID
export const getPatientById = async (id: string): Promise<Patient> => {
  try {
    const response = await fetch(`${PATIENTS_ENDPOINT}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch patient: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching patient ${id}:`, error);
    throw error;
  }
};

// POST create new patient
export const createPatient = async (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient> => {
  try {
    const response = await fetch(PATIENTS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    });
    if (!response.ok) {
      throw new Error(`Failed to create patient: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating patient:', error);
    throw error;
  }
};

// PUT update patient
export const updatePatient = async (id: string, patient: Partial<Patient>): Promise<Patient> => {
  try {
    const response = await fetch(`${PATIENTS_ENDPOINT}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    });
    if (!response.ok) {
      throw new Error(`Failed to update patient: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error updating patient ${id}:`, error);
    throw error;
  }
};

// DELETE patient
export const deletePatient = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${PATIENTS_ENDPOINT}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete patient: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting patient ${id}:`, error);
    throw error;
  }
};

