export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
    },
    USERS: {
        LIST: '/users',
        CREATE: '/users',
        UPDATE: (id: string) => `/users/${id}`,
        DELETE: (id: string) => `/users/${id}`,
    },
    PATIENTS: {
        LIST: '/patients',
        CREATE: '/patients',
        UPDATE: (id: string) => `/patients/${id}`,
        DELETE: (id: string) => `/patients/${id}`,
    },
    TEST_ORDERS: {
        LIST: '/test-orders',
        CREATE: '/test-orders',
        UPDATE: (id: string) => `/test-orders/${id}`,
        DELETE: (id: string) => `/test-orders/${id}`,
    },
    INSTRUMENTS: {
        LIST: '/instruments',
        CREATE: '/instruments',
        UPDATE: (id: string) => `/instruments/${id}`,
        DELETE: (id: string) => `/instruments/${id}`,
    },
} as const

export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    TECHNICIAN: 'technician',
} as const

export const TEST_STATUS = {
    PENDING: 'Pending',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
} as const

export const INSTRUMENT_STATUS = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    MAINTENANCE: 'Maintenance',
} as const

export const FLAG_TYPES = {
    NORMAL: 'Normal',
    HIGH: 'High',
    LOW: 'Low',
    CRITICAL: 'Critical',
} as const

export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
} as const
