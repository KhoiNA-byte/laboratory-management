import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../store'

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector(selector)

// Auth hooks
export const useAuth = () => {
    const dispatch = useAppDispatch()
    const auth = useAppSelector((state) => state.auth)

    const login = (credentials: { email: string; password: string }) => {
        dispatch({ type: 'auth/loginRequest', payload: credentials })
    }

    const logout = () => {
        dispatch({ type: 'auth/logoutRequest' })
    }

    const clearError = () => {
        dispatch({ type: 'auth/clearError' })
    }

    return {
        ...auth,
        login,
        logout,
        clearError,
    }
}

// User hooks
export const useUsers = () => {
    const dispatch = useAppDispatch()
    const users = useAppSelector((state) => state.users)

    const getUsers = () => {
        dispatch({ type: 'users/getUsersRequest' })
    }

    const createUser = (userData: any) => {
        dispatch({ type: 'users/createUserRequest', payload: userData })
    }

    const updateUser = (userData: any) => {
        dispatch({ type: 'users/updateUserRequest', payload: userData })
    }

    const deleteUser = (id: string) => {
        dispatch({ type: 'users/deleteUserRequest', payload: id })
    }

    return {
        ...users,
        getUsers,
        createUser,
        updateUser,
        deleteUser,
    }
}

// Patient hooks
export const usePatients = () => {
    const dispatch = useAppDispatch()
    const patients = useAppSelector((state) => state.patients)

    const getPatients = () => {
        dispatch({ type: 'patients/getPatientsRequest' })
    }

    const createPatient = (patientData: any) => {
        dispatch({ type: 'patients/createPatientRequest', payload: patientData })
    }

    const updatePatient = (patientData: any) => {
        dispatch({ type: 'patients/updatePatientRequest', payload: patientData })
    }

    const deletePatient = (id: string) => {
        dispatch({ type: 'patients/deletePatientRequest', payload: id })
    }

    return {
        ...patients,
        getPatients,
        createPatient,
        updatePatient,
        deletePatient,
    }
}

// Test Order hooks
export const useTestOrders = () => {
    const dispatch = useAppDispatch()
    const testOrders = useAppSelector((state) => state.testOrders)

    const getTestOrders = () => {
        dispatch({ type: 'testOrders/getTestOrdersRequest' })
    }

    const createTestOrder = (orderData: any) => {
        dispatch({ type: 'testOrders/createTestOrderRequest', payload: orderData })
    }

    const updateTestOrder = (orderData: any) => {
        dispatch({ type: 'testOrders/updateTestOrderRequest', payload: orderData })
    }

    const deleteTestOrder = (id: string) => {
        dispatch({ type: 'testOrders/deleteTestOrderRequest', payload: id })
    }

    return {
        ...testOrders,
        getTestOrders,
        createTestOrder,
        updateTestOrder,
        deleteTestOrder,
    }
}

// Instrument hooks
export const useInstruments = () => {
    const dispatch = useAppDispatch()
    const instruments = useAppSelector((state) => state.instruments)

    const getInstruments = () => {
        dispatch({ type: 'instruments/getInstrumentsRequest' })
    }

    const createInstrument = (instrumentData: any) => {
        dispatch({ type: 'instruments/createInstrumentRequest', payload: instrumentData })
    }

    const updateInstrument = (instrumentData: any) => {
        dispatch({ type: 'instruments/updateInstrumentRequest', payload: instrumentData })
    }

    const deleteInstrument = (id: string) => {
        dispatch({ type: 'instruments/deleteInstrumentRequest', payload: id })
    }

    return {
        ...instruments,
        getInstruments,
        createInstrument,
        updateInstrument,
        deleteInstrument,
    }
}