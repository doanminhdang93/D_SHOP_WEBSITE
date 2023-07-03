import React from 'react'
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import UserOrderDetails from '../components/UserOrderDetails';

const OrderDetailsPage = () => {
    return (
        <div>
            <Header></Header>
            <UserOrderDetails></UserOrderDetails>
            <Footer></Footer>
        </div>
    )
}

export default OrderDetailsPage;