import React from 'react'
import { Outlet, Navigate, Route } from 'react-router-dom'

export function PublicRoute({ isAuthenticated, component }) {
    if (isAuthenticated) {
        return <Navigate to="/"/>
    }

    return <>{component}</>
}



