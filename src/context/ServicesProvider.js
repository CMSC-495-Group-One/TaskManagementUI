import React, { createContext, useContext } from "react";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import TaskService from "../services/TaskService";
import RoleService from "../services/RoleService";

// export const ServiceContext = createContext();
const ServiceContext = createContext();

// exporting here instead
export const ServicesProvider = ({ children }) => (
    <ServiceContext.Provider value={{ AuthService, UserService, TaskService, RoleService }}>
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
