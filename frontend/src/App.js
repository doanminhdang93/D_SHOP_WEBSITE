import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css"
import {LoginPage,SignUpPage,ActivationPage,HomePage,ProductsPage,BestSellingPage,EventsPage,FAQPage} from "./Routes.js"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Store from './redux/store';
import { loadUser } from './redux/actions/user';
import {useSelector} from "react-redux";

const App = () => {
  const {loading} = useSelector((state) => state.user);
  useEffect(() => {
    Store.dispatch(loadUser());
  },[]);
  return (
    <>
      {
        loading ? null : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage></HomePage>}></Route>
              <Route path="/login" element={<LoginPage></LoginPage>}></Route>
              <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
              <Route path="/activation/:activation_token" element={<ActivationPage></ActivationPage>}></Route>
              <Route path="/products" element={<ProductsPage></ProductsPage>}></Route>
              <Route path="/best-selling" element={<BestSellingPage></BestSellingPage>}></Route>
              <Route path="/events" element={<EventsPage></EventsPage>}></Route>
              <Route path="/faq" element={<FAQPage></FAQPage>}></Route>
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
    </>
  )
}

export default App