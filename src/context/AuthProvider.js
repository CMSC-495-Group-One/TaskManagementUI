import React, { createContext, useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";

import authService from "../services/AuthService";

const AuthContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (credentials) => {
    const data = await authService.signIn(credentials);
    if (data?.accessToken) {
      const { sub, email, userId } = jwt_decode(data.accessToken);
      setUser({ sub, email, userId });
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const contextValue = useContext(AuthContext);

  if (contextValue === undefined) {
    throw new Error("useAuth must be used within a AuthenticationProvider");
  }

  return contextValue;
};
