import { Routes, Route } from 'react-router-dom';

import CreateAccount from './pages/CreateAccount/CreateAccount';
import LogInPage from './pages/LogIn/LogInPage';
import UserPage from './pages/CurUserPage/UserPage';
import RestorePassword from './pages/RestorePassword/RestorePassword';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [isUser, setIsUser] = useState(false)
  const userInAccount = useSelector(state => state.toolkit.userInAccount);

  useEffect(() => {
    if (!userInAccount) {
      setIsUser(false)
    }
    if(userInAccount){
      setIsUser(true)
    }
    
  },[userInAccount])
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path='*' element={!isUser ? <UserPage /> : <LogInPage />} />
        <Route path="/userpage/:name" element={<UserPage />} />
        <Route path="/logInPage" element={<LogInPage />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/restorePassword" element={<RestorePassword />} />
      </Routes>
    </div>
  );
}

export default App;

