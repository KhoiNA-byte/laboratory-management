// services/instrumentsApi.ts
import { Instrument } from '../types';

const BASE_URL = import.meta.env.VITE_MOCKAPI_BASE_URL;
const INSTRUMENTS_ENDPOINT = import.meta.env.VITE_MOCKAPI_INSTRUMENTS_ENDPOINT;
const FULL_URL = `${BASE_URL}${INSTRUMENTS_ENDPOINT}`;

class InstrumentService {
  async getInstruments(): Promise<Instrument[]> {
    
    try {
      const response = await fetch(FULL_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const instruments = await response.json();
      return instruments;
    } catch (error) {
      throw error;
    }
  }

  async createInstrument(instrumentData: Omit<Instrument, 'id'>): Promise<Instrument> {
    console.log('🔄 Creating instrument:', instrumentData);
    
    try {
      const response = await fetch(FULL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(instrumentData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const newInstrument = await response.json();
      return newInstrument;
    } catch (error) {
      throw error;
    }
  }

  async updateInstrument(instrument: Instrument): Promise<Instrument> {
    console.log('🔄 Updating instrument:', instrument);
    
    try {
      const response = await fetch(`${FULL_URL}/${instrument.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(instrument)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const updatedInstrument = await response.json();
      console.log('✅ Instrument updated:', updatedInstrument);
      return updatedInstrument;
    } catch (error) {
      console.error('❌ Error updating instrument:', error);
      throw error;
    }
  }

  async deleteInstrument(id: string): Promise<void> {
    console.log('🔄 Deleting instrument ID:', id);
    
    try {
      const response = await fetch(`${FULL_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log('✅ Instrument deleted:', id);
    } catch (error) {
      console.error('❌ Error deleting instrument:', error);
      throw error;
    }
  }
}

export const instrumentService = new InstrumentService();