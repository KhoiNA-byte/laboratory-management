import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { loginRequest } from '../store/slices/authSlice'

export const TestLogin = () => {
    const dispatch = useDispatch()
    const auth = useSelector((state: RootState) => state.auth)

    const testUserLogin = () => {
        dispatch(loginRequest({ email: 'user@lab.com', password: 'user123' }))
    }

    const testAdminLogin = () => {
        dispatch(loginRequest({ email: 'admin@lab.com', password: 'admin123' }))
    }

    return (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-300 rounded-lg p-4">
            <h4 className="font-bold mb-2">Test Login:</h4>
            <div className="space-y-2">
                <button
                    onClick={testUserLogin}
                    className="w-full bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                    Test User Login
                </button>
                <button
                    onClick={testAdminLogin}
                    className="w-full bg-purple-500 text-white px-3 py-1 rounded text-sm"
                >
                    Test Admin Login
                </button>
            </div>
            <div className="mt-2 text-xs">
                <p>Auth: {auth.isAuthenticated ? 'Yes' : 'No'}</p>
                <p>User: {auth.user?.name || 'None'}</p>
                <p>Role: {auth.user?.role || 'None'}</p>
            </div>
        </div>
    )
}
