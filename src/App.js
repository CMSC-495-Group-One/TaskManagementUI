import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthenticationProvider } from "./context";
import { ServicesProvider } from "./context/ServicesProvider";
import { Routes } from "./components/routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ServicesProvider>
          <AuthenticationProvider>
            <Routes />
          </AuthenticationProvider>
        </ServicesProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
