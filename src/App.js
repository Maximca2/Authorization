import { Routes, Route} from 'react-router-dom';

import CreateAccount from './pages/CreateAccount/CreateAccount';
import LogInPage from './pages/LogIn/LogInPage';
import UserPage from './pages/CurUserPage/UserPage';
import MainPage from './pages/MainPage/MainPage';
import RestorePassword from './pages/RestorePassword/RestorePassword';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import './App.css';

function App() {
  const userInAccount = useSelector((state) => state.toolkit.userInAccount);
  const [userInPage,setUserInPage] = useState(true)
  
  useEffect(()=>{
    if (localStorage.getItem('CUR_USER_TOKEN') === '[]') {
      setUserInPage(false)
  }else{
    setTimeout(()=>{
      setUserInPage(true)
    },2000)
      
  }
  },[userInAccount])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={userInPage?<UserPage />: <MainPage />} />
        <Route path="*" element={userInPage?<UserPage />: <MainPage />} />
        <Route path="/" element={<UserPage />} />
        <Route path="/logInPage" element={userInPage?<UserPage/>:<LogInPage />}/>
        <Route path="/createAccount" element={userInPage?<UserPage/>:<CreateAccount />} />
        <Route path="/restorePassword" element={userInPage?<UserPage/>:<RestorePassword />} />
      </Routes>
    </div>
  );
}

export default App;

