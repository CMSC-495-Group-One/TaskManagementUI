import "./App.css";
import SignInForm from "./components/sign-in";
import Tasks from "./components/tasks";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ServicesProvider } from "./context/ServicesProvider";
import { AuthenticationProvider } from "./context";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ServicesProvider>
          <AuthenticationProvider>
            <Routes>
              <Route path="/" element={<SignInForm />}/>
              <Route path="/sign_in" element={<SignInForm />}/>
              <Route path="/tasks" element={<Tasks />}/>
            </Routes>
        </AuthenticationProvider>
      </ServicesProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
