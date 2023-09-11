import { Routes, Route } from 'react-router-dom';

import CreateAccount from './pages/CreateAccount/CreateAccount';
import LogInPage from './pages/LogIn/LogInPage';
import UserPage from './pages/CurUserPage/UserPage';
import RestorePassword from './pages/RestorePassword/RestorePassword';

import './App.css';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="*" element={<LogInPage />} />
        <Route path="/userpage/:name" element={<UserPage />} />
        <Route path="/logInPage" element={<LogInPage />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/restorePassword" element={<RestorePassword />} />
      </Routes>
    </div>
  );
}

export default App;

