import React, { createContext, useState, useEffect, useContext } from "react";
// import jwtDecode from 'jsonwebtoken';
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const AuthenticationProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const {sub, email, userId } = jwt_decode(token);
            setUser({ sub, email, userId })
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const contextValue = useContext(AuthContext);

    if (contextValue === undefined) {
        throw new Error('useAuth must be used within a AuthenticationProvider');
    }

    return contextValue;
};