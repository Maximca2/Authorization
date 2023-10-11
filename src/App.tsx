import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import CreateAccount from "./pages/CreateAccount";
import LogInPage from "./pages/LogIn";
import RestorePassword from "./pages/RestorePassword";
import InfoPage from "./pages/InfoPage";
import MainPage from "./pages/MainPage";

import Private from "./Components/PrivateRoutes";
//hooks
import {AppSelector} from '../src/hooks/hooks'
//style
import "./App.css";




const App = () => {

  const token = AppSelector((state) => state.toolkit.curUserToken);
  return (
    <div className="app">
      <Routes>
        <Route
          element={
            <Private>
              <InfoPage />
            </Private>
          }
        ></Route>
        <Route path="/" element={token ? <InfoPage /> : <MainPage />} />
        <Route path="*" element={token ? <InfoPage /> : <MainPage />} />
        <Route
          path="/logIn"
          element={token ? <Navigate to="/" /> : <LogInPage />}
        />
        <Route
          path="/createAccount"
          element={token ? <Navigate to="/" /> : <CreateAccount />}
        />
        <Route
          path="/restorePassword"
          element={token ? <Navigate to="/" /> : <RestorePassword />}
        />
      </Routes>
    </div>
  );
};

export default App;
