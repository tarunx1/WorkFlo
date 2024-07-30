// src/components/Header.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaRegCircleQuestion } from "react-icons/fa6";

const Header = () => {
    const { user, logout } = useContext(AuthContext);
const name = user.userName.split(" ");
const firstName = name[0];
    return (
        <div className="flex items-center justify-between h-20 px-6 bg-gray-100">
            <h2 className="text-2xl font-semibold">Good Morning, {user ? firstName : 'Guest'}!</h2>
            <span className="py-2.5 px-5 text-sm flex flex-row justify-center items-center gap-2">Help & Support<FaRegCircleQuestion /></span>
        </div>
    );
};

export default Header;
