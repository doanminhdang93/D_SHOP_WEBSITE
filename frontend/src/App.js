import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  LoginPage,
  SignUpPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailsPage,
  ProfilePage,
  CheckoutPage,
  CreateShopPage,
  SellerActivationPage,
  ShopLoginPage,
  OrderSuccessPage,
} from "./routes/Routes.js";
import {
  ShopHomePage,
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllCoupons,
  ShopPreviewPage,
} from "./routes/ShopRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import { getAllProducts } from "./redux/actions/product";

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>

        <Route path="/login" element={<LoginPage></LoginPage>}></Route>

        <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>

        <Route
          path="/activation/:activation_token"
          element={<ActivationPage></ActivationPage>}
        ></Route>

        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage></SellerActivationPage>}
        ></Route>

        <Route path="/products" element={<ProductsPage></ProductsPage>}></Route>

        <Route
          path="/product/:name"
          element={<ProductDetailsPage></ProductDetailsPage>}
        ></Route>

        <Route
          path="/best-selling"
          element={<BestSellingPage></BestSellingPage>}
        ></Route>

        <Route path="/events" element={<EventsPage></EventsPage>}></Route>

        <Route path="/faq" element={<FAQPage></FAQPage>}></Route>

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage></CheckoutPage>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/order/success"
          element={<OrderSuccessPage></OrderSuccessPage>}
        ></Route>

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage></ProfilePage>
            </ProtectedRoute>
          }
        ></Route>

        {/* Shop Routes */}
        <Route path="/shop/preview/:id" element={<ShopPreviewPage/>} />

        <Route
          path="/shop-create"
          element={<CreateShopPage></CreateShopPage>}
        ></Route>

        <Route
          path="/shop-login"
          element={<ShopLoginPage></ShopLoginPage>}
        ></Route>

        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage></ShopHomePage>
            </SellerProtectedRoute>
          }
        ></Route>

        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage></ShopDashboardPage>
            </SellerProtectedRoute>
          }
        ></Route>

        <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct></ShopCreateProduct>
            </SellerProtectedRoute>
          }
        ></Route>

        <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute>
              <ShopAllProducts></ShopAllProducts>
            </SellerProtectedRoute>
          }
        ></Route>

        <Route
          path="/dashboard-create-event"
          element={
            <SellerProtectedRoute>
              <ShopCreateEvents></ShopCreateEvents>
            </SellerProtectedRoute>
          }
        ></Route>

        <Route
          path="/dashboard-events"
          element={
            <SellerProtectedRoute>
              <ShopAllEvents></ShopAllEvents>
            </SellerProtectedRoute>
          }
        ></Route>

        <Route
          path="/dashboard-coupons"
          element={
            <SellerProtectedRoute>
              <ShopAllCoupons></ShopAllCoupons>
            </SellerProtectedRoute>
          }
        ></Route>

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
  );
};

export default App;
