import React from 'react'
import { Outlet, Navigate, Route } from 'react-router-dom'

export function PrivateRoute({ isAuthenticated, component }) {
    if (isAuthenticated) {
        return <>{component}</>
    }
    return <Navigate to="/signin" />
}



