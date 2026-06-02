import React from 'react';
import { Navigate } from 'react-router-dom';

// Simple guard checking explicit authentication parameters
export default function ProtectedRoute({ children }) {
  // Pull simulation check status from browser memory storage
  const isAuthenticated = localStorage.getItem('userToken') === 'true';

  if (!isAuthenticated) {
    // Kick unauthorized streams straight to login verification gate
    return <Navigate to="/login" replace />;
  }

  return children;
}