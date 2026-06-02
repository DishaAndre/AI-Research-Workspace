import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';

export default function Home() {
  const navigate = useNavigate();

  // Read the active live session verification key directly from local memory
  const isAuthenticated = localStorage.getItem('userToken') === 'true';

  // Handle the "Get Started Free" action route dynamically
  const handleGetStarted = () => {
    if (isAuthenticated) {
      // User has active token credentials -> Route directly to dashboard
      navigate('/dashboard');
    } else {
      // No active token found -> Send to standard login authentication gate
      navigate('/login');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Premium Ambient Background Decorative Blur Fields */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
        <div className="absolute top-12 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-12 right-10 w-96 h-96 bg-indigo-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl text-center flex flex-col gap-8 items-center relative z-10">
        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight leading-[1.15]">
          Your Intelligent Workspace for <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Research & Notes</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl font-normal leading-relaxed">
          Upload multi-page research documents, extract dynamic modular insights, compile contextual outlines, and interface with your files through an interactive AI terminal.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mt-2">
          {/* Dynamically Routed Primary Action Trigger */}
          <Button 
            text="Get Started Free" 
            variant="primary" 
            onClick={handleGetStarted} 
          />
          
          <Button 
            text="Go to Workspace" 
            variant="secondary" 
            onClick={() => navigate('/dashboard')} 
          />
        </div>
      </div>
    </div>
  );
}