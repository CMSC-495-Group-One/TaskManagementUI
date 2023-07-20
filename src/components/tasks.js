import React, { useState } from "react";
import { Outlet, useLocation, Navigate} from "react-router-dom";

const Tasks = () => {
    const location = useLocation();
    
    return (
        location.state !== null ? <div>Task Page<Outlet/></div> : <Navigate to="/sign_in"/>
    )
}

export default Tasks