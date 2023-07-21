import { Outlet, useLocation, Navigate } from "react-router-dom";
import { Box } from "@material-ui/core";

const Tasks = () => {
  const { state } = useLocation();
  if (!state || !state?.userId) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <Box>
      Task Page
      <Outlet />
    </Box>
  );
};

export default Tasks;
