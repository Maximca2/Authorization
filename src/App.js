import { Routes, Route, Navigate} from 'react-router-dom';
import { useSelector } from "react-redux";

import CreateAccount from './pages/CreateAccount/CreateAccount';
import LogInPage from './pages/LogIn/LogInPage';

import RestorePassword from './pages/RestorePassword/RestorePassword';
import Private from './Komponents/PrivateRoutes/Routes/PrivateRoute';

import MainPage from './pages/MainPage/MainPage';
import InfoPage from './pages/InfoPage/InfoPage';

import './App.css';

function App() {
  
  const token = useSelector((state) => state.toolkit.curUserToken );

  return (
    <div className="app">
      <Routes>
        <Route element={<Private>
          <InfoPage/>
        </Private>}>
        </Route>
        <Route path='/maipage' element={<MainPage />} />
        <Route path='/' element={token?<InfoPage />:<MainPage/>} />
        <Route path='/logInPage' element={token?<Navigate to={'/'}/> :<LogInPage/>} />
        <Route path='/createAccount' element={token?<Navigate to={'/'}/> :<CreateAccount /> } />
        <Route path='/restorePassword' element={token?<Navigate to={'/'}/> :<RestorePassword />} />
      </Routes>
    </div>
  );
}

export default App;

