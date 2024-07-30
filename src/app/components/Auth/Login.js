import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import "../../globals.css"

const Login = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error('Failed to login:', error);
      // Handle login error (show message to user, etc.)
    }
  };

    return (
        <div className="auth-container p-7 ">
            <h2 className='font-bold text-3xl'>Welcome to <span className='text-purple-500'>Workflo!</span></h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-2'>
                <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className='big-button'>Login</button>
            </form>
            <p className='text-sm mt-4'>Don't have an account? <a href="/signup" className='text-purple-600'>Create a new account</a></p>
        </div>
    );
};

export default Login;
