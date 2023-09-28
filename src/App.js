import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import CreateAccount from './pages/CreateAccount';
import LogInPage from './pages/LogIn';
import RestorePassword from './pages/RestorePassword';
import InfoPage from './pages/InfoPage';
import MainPage from './pages/MainPage';

import Private from './Components/PrivateRoutes';

import './App.css';

function App() {

  const token = useSelector((state) => state.toolkit.curUserToken);
 

  return (
    <div className="app">
      <Routes>
        <Route element={<Private>
          <InfoPage />
        </Private>}>
        </Route>
        <Route path='/' element={token ? <InfoPage /> : <MainPage />} />
        <Route path='*' element={token ? <InfoPage /> : <MainPage />} />
        <Route path="/logIn" element={token ? <Navigate to='/' /> : <LogInPage />} />
        <Route path='/createAccount' element={token ? <Navigate to='/' /> : <CreateAccount />} />
        <Route path='/restorePassword' element={token ? <Navigate to='/' /> : <RestorePassword />} />
      </Routes>
    </div>
  );
}

export default App;

