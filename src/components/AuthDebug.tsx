import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

export const AuthDebug = () => {
    const auth = useSelector((state: RootState) => state.auth)

    return (
        <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-300 rounded-lg p-4 text-xs max-w-xs">
            <h4 className="font-bold mb-2">Auth Debug:</h4>
            <p><strong>Authenticated:</strong> {auth.isAuthenticated ? 'Yes' : 'No'}</p>
            <p><strong>Loading:</strong> {auth.loading ? 'Yes' : 'No'}</p>
            <p><strong>Error:</strong> {auth.error || 'None'}</p>
            <p><strong>User:</strong> {auth.user ? `${auth.user.name} (${auth.user.role})` : 'None'}</p>
            <p><strong>Token:</strong> {auth.token ? 'Present' : 'None'}</p>
        </div>
    )
}
