import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input, Button } from '../components';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill out all registration fields.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration pipeline failed.');
      }

      setSuccess('Account created successfully! Redirecting...');
      
      // Store session verification states natively
      localStorage.setItem('userToken', 'true');
      localStorage.setItem('token', data.token);

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs max-w-md w-full flex flex-col gap-6">
        
        {/* Navigation Escape Route */}
        <div>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-150">←</span> 
            Back to Home
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Create Academic Account</h2>
          <p className="text-sm text-gray-500">Register your profile to initialize secure workspace memory arrays.</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-semibold">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm font-semibold">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input 
            label="Academic Email Address" 
            type="email" 
            placeholder="username@university.edu" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            label="Password Secret Key" 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Button 
            text={loading ? "Registering Profile..." : "Register System Profile"} 
            variant="primary" 
            type="submit"
            disabled={loading}
          />
        </form>

        <div className="text-center text-sm text-gray-600 font-medium">
          Already registered?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-bold">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}