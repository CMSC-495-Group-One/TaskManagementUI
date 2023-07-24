import { Route, Routes as _Routes } from "react-router-dom";
import SignInForm from "./sign-in";
import Tasks from "./tasks";
import SignUp from "./SignUp";

export const Routes = () => {
  return (
    <_Routes>
      <Route path="/" element={<SignInForm />} />
      <Route path="/sign-in" element={<SignInForm />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/sign-up" element={<SignUp />} />
    </_Routes>
  );
};
