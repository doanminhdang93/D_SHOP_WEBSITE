import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css"
import {LoginPage,SignUpPage,ActivationPage} from "./Routes.js"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Store from './redux/store';
import { loadUser } from './redux/actions/user';

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
  },[]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/activation/:activation_token" element={<ActivationPage></ActivationPage>}></Route>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  )
}

export default App