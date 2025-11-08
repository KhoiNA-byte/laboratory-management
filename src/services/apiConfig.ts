// src/services/apiConfig.ts

const API_BASE_URL = import.meta.env.VITE_MOCKAPI_BASE_URL;

// User endpoints
export const USERS_ENDPOINT = `${API_BASE_URL}${
  import.meta.env.VITE_MOCKAPI_USERS_ENDPOINT
}`;

// All other endpoints
export const PATIENTS_ENDPOINT = `${API_BASE_URL}/patients`;
export const ROLES_ENDPOINT = `${API_BASE_URL}/roles`;
export const TEST_ORDER_ENDPOINT = `${API_BASE_URL}/test_order`;
export const TEST_RESULTS_ENDPOINT = `${API_BASE_URL}/test_results`;
export const INSTRUMENTS_ENDPOINT = `${API_BASE_URL}/instruments`;
export const REAGENTS_ENDPOINT = `${API_BASE_URL}/reagents`;
export const CBC_PARAMETERS_ENDPOINT = `${API_BASE_URL}/cbc_parameters`;
export const INSTRUMENT_MODE_HISTORY_ENDPOINT = `${API_BASE_URL}/instrument_mode_history`;
export const RAW_RESULTS_ENDPOINT = `${API_BASE_URL}/raw_results`;
export const LOADED_REAGENTS_ENDPOINT = `${API_BASE_URL}/loaded_reagents`;

export { API_BASE_URL };
