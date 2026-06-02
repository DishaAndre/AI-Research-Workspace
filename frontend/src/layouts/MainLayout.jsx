import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

export default function MainLayout() {
  const loc = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('userToken') === 'true';

  // High-visibility crisp styling choices
  const getLinkStyle = (p) => {
    const baseStyle = "px-4 py-2 rounded-lg text-base font-bold tracking-tight transition-all duration-200 flex items-center h-10 ";
    if (loc.pathname === p) {
      return baseStyle + "bg-blue-50 text-blue-700 shadow-xs";
    }
    return baseStyle + "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80";
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* High-Contrast Sticky Navigation Banner */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200/80 shadow-xs">
        <div className="w-full px-6 sm:px-10 lg:px-14 h-16 flex items-center justify-between">
          
          {/* Text-Only Logo Header - Icon Removed */}
          <Link to="/" className="flex items-center group h-full">
            <span className="text-xl font-black tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-150 antialiased">
              AI Research Workspace
            </span>
          </Link>

          {/* Bold, Clearly Visible Nav Elements */}
          <nav className="flex items-center gap-3">
            <Link to="/" className={getLinkStyle('/')}>
              Home
            </Link>
            <Link to="/dashboard" className={getLinkStyle('/dashboard')}>
              Workspace
            </Link>
            
            <span className="h-5 w-[1px] bg-gray-200 mx-2 hidden sm:inline-block"></span>

            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="h-10 bg-red-600 hover:bg-red-700 text-white px-5 rounded-lg font-bold text-sm tracking-wide transition-all duration-150 shadow-xs cursor-pointer antialiased"
              >
                Sign Out
              </button>
            ) : (
              <Link 
                to="/login" 
                className="h-10 bg-gray-900 hover:bg-gray-800 text-white px-5 rounded-lg font-bold text-sm tracking-wide transition-all duration-150 shadow-xs flex items-center justify-center antialiased"
              >
                Sign In
              </Link>
            )}
          </nav>

        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}