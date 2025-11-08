export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
  age: number;
  address: string;
  password?: string;
  status: string;
  lastLogin: string;
  createdAt?: string;
  updatedAt?: string;
}

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

export interface TestOrder {
  id?: string;
  run_id?: string;
  testType: string;
  patientId?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

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

export interface FlaggingRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  createdAt: string;
  updatedAt: string;
}

export interface HL7Message {
  id: string;
  type: string;
  status: "Sent" | "Received" | "Failed";
  timestamp: string;
  content: string;
}

export interface QuarantineItem {
  id: string;
  sampleId: string;
  reason: string;
  date: string;
  status: "Active" | "Released";
}

export interface InstrumentLog {
  id: string;
  instrumentId: string;
  event: string;
  timestamp: string;
  details: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  details: string;
}
