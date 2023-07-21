import React, { useState } from "react";
import { Outlet, useLocation, Navigate} from "react-router-dom";
import { Box } from "@mui/material";

const Tasks = () => {
    const { state } = useLocation();
    if(!state || !state?.userId){
        return <Navigate to="/sign-in" />;
    }
    return (
        <Box>Task Page<Outlet/></Box>
    )
}

export default Tasks
