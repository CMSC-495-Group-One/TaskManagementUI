import { Route, Routes as _Routes } from "react-router-dom";
import SignInForm from "../SignIn";
import Tasks from "../taskboard/tasks";
import Profile from "../taskboard/Profile"
import { PrivateRoutes } from "./private-routes";
import SignUp from "../SignUp";

export const Routes = () => {
  return (
    <_Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/profile" element={<Profile />} />

      </Route>

      <Route path="/" element={<SignInForm />} />
      <Route path="/sign-in" element={<SignInForm />} />
      <Route path="/sign-up" element={<SignUp />} />
    </_Routes>
  );
};
