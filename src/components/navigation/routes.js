import { Route, Routes as _Routes } from "react-router-dom";
import SignInForm from "../sign-in";
import Tasks from "../tasks";
import { PrivateRoutes } from "./private-routes";

export const Routes = () => {
  return (
    <_Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/tasks" element={<Tasks />} />
      </Route>

      <Route path="/" element={<SignInForm />} />
      <Route path="/sign-in" element={<SignInForm />} />
    </_Routes>
  );
};
