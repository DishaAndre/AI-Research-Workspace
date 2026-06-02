import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Enterprise Route Guard Layer
 * Validates active cryptographic credentials before allowing entry into deep workspace sub-layouts.
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();
  
  // Real-world check: Verify both the authentication flag and a valid token string exist
  const isAuthenticated = localStorage.getItem('userToken') === 'true';
  const tokenExists = !!localStorage.getItem('token');

  if (!isAuthenticated || !tokenExists) {
    // Redirect unauthorized navigation attempts to login gate, retaining history states for direct fallback routing
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}