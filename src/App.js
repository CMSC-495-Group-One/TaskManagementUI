// import logo from './logo.svg';
import './App.css';
import SignInForm from './components/sign-in';
import { ServicesProvider } from './context/ServicesProvider';
import { AuthenticationProvider } from './context'

function App() {
  return (
    <div className="App">
      <ServicesProvider>
        <AuthenticationProvider>
          <SignInForm />
        </AuthenticationProvider>
      </ServicesProvider>
    </div>
  );
}

export default App;
