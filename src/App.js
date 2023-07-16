import logo from './logo.svg';
import './App.css';
import SignInForm from './components/sign-in';
import { AuthenticationProvider } from './context'

function App() {
  return (
    <div className="App">
      <AuthenticationProvider>
        <SignInForm />
      </AuthenticationProvider>
    </div>
  );
}

export default App;
