import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

export const SimpleDebug = () => {
    const auth = useSelector((state: RootState) => state.auth)

    return (
        <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-300 rounded-lg p-3 text-xs max-w-xs z-50">
            <h4 className="font-bold mb-1">Debug:</h4>
            <p>Auth: {auth.isAuthenticated ? '✅' : '❌'}</p>
            <p>Loading: {auth.loading ? '⏳' : '✅'}</p>
            <p>User: {auth.user?.name || 'None'}</p>
            <p>Role: {auth.user?.role || 'None'}</p>
            {auth.error && <p className="text-red-600">Error: {auth.error}</p>}
        </div>
    )
}
