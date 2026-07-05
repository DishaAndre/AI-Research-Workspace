import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../layouts/MainLayout";

// High-fidelity route guard to block unauthenticated layout views
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('userToken') === 'true' && !!localStorage.getItem('token');
  
  // Guard interceptor checkpoint boundary layer
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// Redirects already-authenticated users away from auth gates (Login/Register) back to the workspace
function PublicRoute({ children }) {
  const isAuthenticated = localStorage.getItem('userToken') === 'true' && !!localStorage.getItem('token');
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Core Layout Shell Structure */}
        <Route element={<MainLayout />}>
          {/* Publicly Accessible Landing View */}
          <Route path="/" element={<Home />} />
          
          {/* Secured Workspace Endpoint Guard Matrix */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* Authentication Gate Routes */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />

        {/* Fallback Catch-All Safety Net Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;