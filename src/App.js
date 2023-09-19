import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import CreateAccount from './pages/CreateAccount/CreateAccount';
import LogInPage from './pages/LogIn/LogInPage';
import UserPage from './pages/InfoPage/InfoPage';
import RestorePassword from './pages/RestorePassword/RestorePassword';
import Private from './Komponents/PrivateRoutes/Routes/PrivateRoute';

import { CUR_USER_TOKEN } from './redux/store/usersReducer';

import './App.css';

function App() {
  const token = localStorage.getItem(CUR_USER_TOKEN);
  const userInAccount = useSelector((state) => state.toolkit.userInAccount);

  return (
    <div className="App">
      <Routes>
        <Route element={<Private />}>
          <Route path='/' element={<UserPage />} />
        </Route>
        <Route path='/logInPage' element={token === '' || token === null || userInAccount ? <LogInPage /> : <Navigate to='/' />} />
        <Route path='/createAccount' element={token === '' || token === null ? <CreateAccount /> : <Navigate to='/' />} />
        <Route path='/restorePassword' element={token === '' || token === null ? <RestorePassword /> : <Navigate to='/' />} />
      </Routes>
    </div>
  );
}

export default App;

