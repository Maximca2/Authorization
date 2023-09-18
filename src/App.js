import { Routes, Route, Navigate } from 'react-router-dom';

import CreateAccount from './pages/CreateAccount/CreateAccount';
import LogInPage from './pages/LogIn/LogInPage';
import UserPage from './pages/CurUserPage/UserPage';
import RestorePassword from './pages/RestorePassword/RestorePassword';
import Private from './pages/Private/PrivateRoute';

import './App.css';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <Private>
            <UserPage />
          </Private>
        } />
        <Route path="/logIn" element={localStorage.getItem('CUR_USER_TOKEN') !== '[]' ? <LogInPage />:<Navigate to="/" />} />
        <Route path="/createAccount" element={localStorage.getItem('CUR_USER_TOKEN') === '[]'||localStorage.getItem('CUR_USER_TOKEN') === null ? <CreateAccount />:<Navigate to="/" />} />
        <Route path="/restorePassword" element={localStorage.getItem('CUR_USER_TOKEN') === '[]'||localStorage.getItem('CUR_USER_TOKEN') === null ? <RestorePassword />:<Navigate to="/" />} />
        <Route path="*" element={localStorage.getItem('CUR_USER_TOKEN') === '[]'||localStorage.getItem('CUR_USER_TOKEN') === null ? <LogInPage />:<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

