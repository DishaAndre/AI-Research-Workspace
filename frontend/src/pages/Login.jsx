import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Card } from '../components';

export default function Login() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [e, setE] = useState('');
  const [p, setP] = useState('');
  const [cp, setCp] = useState('');
  const n = useNavigate();

  const handleAuthSubmit = (event) => {
    event.preventDefault();
    if (!e || !p || (isNewUser && !cp)) {
      alert("Please specify all form verification details.");
      return;
    }
    if (isNewUser && p !== cp) {
      alert("Passwords do not match.");
      return;
    }
    
    // Write access key into transient memory storage to pass protected route checks
    localStorage.setItem('userToken', 'true');
    n('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="w-full max-w-lg flex flex-col gap-4">
        
        <button 
          onClick={() => n('/')}
          className="flex items-center gap-2 text-base font-bold text-gray-500 hover:text-blue-600 self-start transition-colors duration-150 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-150">←</span> 
          Back to Home
        </button>

        <Card 
          title={isNewUser ? "Create Your Workspace Account" : "Account Sign In"} 
          description={isNewUser ? "Get setup instantly to begin processing your PDFs and lecture insights." : "Secure entry access layer to your documents, summary models, and session streams."}
        >
          <form onSubmit={handleAuthSubmit} className="flex flex-col gap-6 mt-2">
            <Input 
              id="user-email"
              label="Academic Email Address" 
              type="email" 
              placeholder="username@university.edu" 
              value={e} 
              onChange={(event) => setE(event.target.value)} 
            />
            <Input 
              id="user-password"
              label={isNewUser ? "Choose Password" : "Password Secret Key"} 
              type="password" 
              placeholder="••••••••" 
              value={p} 
              onChange={(event) => setP(event.target.value)} 
            />
            
            {isNewUser && (
              <Input 
                id="user-confirm-password"
                label="Confirm Choice Password" 
                type="password" 
                placeholder="••••••••" 
                value={cp} 
                onChange={(event) => setCp(event.target.value)} 
              />
            )}

            <div className="pt-2">
              <Button text={isNewUser ? "Register & Open Workspace" : "Authenticate Workspace"} type="submit" variant="primary" />
            </div>

            <div className="text-center border-t border-gray-100 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsNewUser(!isNewUser);
                  setE('');
                  setP('');
                  setCp('');
                }}
                className="text-base text-blue-600 hover:text-blue-800 font-bold transition-colors duration-150"
              >
                {isNewUser ? "Already have an account? Sign In" : "New to the platform? Create an account"}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}