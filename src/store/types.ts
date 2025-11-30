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
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  phone: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TestOrder {
  id: string;
  patientId: string;
  testName: string;
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface TestResult {
  id: string;
  orderId: string;
  testName: string;
  result: string;
  flag: "Normal" | "High" | "Low" | "Critical";
  createdAt: string;
  updatedAt: string;
}

// src/types/Instrument.ts
export interface Instrument {
  id: string;
  name: string;
  model: string;
  status: "Active" | "Maintenance" | "Inactive";
  serialNumber: string;
  location: string;
  manufacturer: string;
  nextCalibration: string;
  calibrationDue: boolean;

  temperature?: string;
  sampleVolume?: string;
  firmwareVersion?: string;
  port?: string;
  encryption?: string;
  ipAddress?: string;
}

export interface Reagent {
  id: string;
  name: string;
  lot: string;
  expiryDate: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
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

export interface TestType {
  id: string;
  name: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions?: string[];
}

export interface Event {
  id: string;
  type?: string;
  action?: string;
  userId?: string;
  description?: string;
  timestamp?: string;
  createdAt?: string;
}
export interface ReportStats {
  totalUsers: number;
  totalRoles: number;
  totalTestOrders: number;
  totalInstruments: number;
  totalReagents: number;
  activeUsers: number;
  inactiveUsers: number;
}
export interface User {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
  age: number;
  address: string;
  status: string;
  lastLogin: string;
  password?: string;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
export interface TestOrder {
  testType: string;
  createdByUserId: number;
  isDeleted: boolean;
  note: string;
  orderedAt: number;
  priority: string;
  run_id: string;
  id: string;
  userId: string;
}

export interface TestOrderState {
  list: TestOrder[];
  loading: boolean;
  error: string | null;
  updatingId?: string | null;
}
