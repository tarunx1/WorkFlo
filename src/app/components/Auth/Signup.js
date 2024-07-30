import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/router';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const { signup, isLoggedIn } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/');
        }
    }, [isLoggedIn, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, userName, password);
        router.push('/');
    };

    return (
        <div className="auth-container">
            <h2 className='font-bold text-3xl'>Welcome to <span className='text-purple-500'>Workflo!</span></h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className='big-button'>Sign Up</button>
            </form>
            <p className='pt-4'>Already have an account?{' '}
                <Link href="/login">
                    <a className='text-purple-500'>Log in</a>
                </Link>
            </p>
        </div>
    );
};

export default Signup;
