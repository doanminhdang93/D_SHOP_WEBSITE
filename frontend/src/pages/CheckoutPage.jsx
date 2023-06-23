import React from 'react'
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import CheckoutSteps from '../components/Checkout/CheckoutSteps';
import Checkout from '../components/Checkout/Checkout';

const CheckoutPage = () => {
  return (
    <div>
      <Header></Header>
      <br />
      <br />
      <CheckoutSteps active={1}></CheckoutSteps>
      <Checkout></Checkout>
      <br />
      <br />
      <Footer></Footer>
    </div>
  )
}

export default CheckoutPage;