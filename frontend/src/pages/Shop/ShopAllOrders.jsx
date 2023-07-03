import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import AllOrders from '../../components/Shop/AllOrders';

const ShopAllOrders = () => {
    return (
        <div>
            <DashboardHeader></DashboardHeader>
            <div className="flex justify-between w-full">
                <div className="800px:w-[330px] w-[80px]">
                    <DashboardSideBar active={2}></DashboardSideBar>
                </div>

                <div className="w-full justify-center flex">
                    <AllOrders></AllOrders>
                </div>
            </div>
        </div>
    )
}

export default ShopAllOrders;