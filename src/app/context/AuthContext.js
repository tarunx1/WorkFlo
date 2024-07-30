import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            api.get('/users/me')
                .then(res => {
                    console.log('User data fetched:', res.data);
                    setUser(res.data);
                    setIsLoggedIn(true);
                })
                .catch(err => {
                    console.error('Error fetching user data:', err);
                    logout();
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const res = await api.post('/users/login', { email, password });
            console.log('Login response:', res.data);
            localStorage.setItem('token', res.data.token);
            api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            setUser(res.data.user);
            console.log("user: ",user)
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Login error', error);
            throw error;
        }
    };

    const signup = async (email,userName, password) => {
        try {
            const res = await api.post('/users/signup', { email,userName, password });
            console.log('Signup response:', res.data);
            localStorage.setItem('token', res.data.token);
            api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            setUser(res.data.user);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Signup error', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
        setIsLoggedIn(false);
    };

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a proper loading component
    }

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
