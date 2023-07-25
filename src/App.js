import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Routes } from "./components/navigation/routes";
import { AuthenticationProvider } from "./context";
import { ServicesProvider } from "./context/ServicesProvider";

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
