import React, { createContext, useContext } from "react";
import AuthService from "../services/AuthService";

// export const ServiceContext = createContext();
const ServiceContext = createContext();

// exporting here instead
export const ServicesProvider = ({ children }) => (
    <ServiceContext.Provider value={{ AuthService }}>
        {children}
    </ServiceContext.Provider>
);

// export default ServicesProvider;

export const useServices = () => {
    const contextValue = useContext(ServiceContext);

    if (contextValue === undefined) {
        throw new Error('useServices must be used within a ServicesProvider');
    }

    return contextValue;
};
