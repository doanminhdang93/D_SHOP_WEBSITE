import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import AllRefundOrders from '../../components/Shop/AllRefundOrders';

const ShopAllRefunds = () => {
    return (
        <div>
            <DashboardHeader></DashboardHeader>
            <div className="flex justify-between w-full">
                <div className="800px:w-[330px] w-[80px]">
                    <DashboardSideBar active={10}></DashboardSideBar>
                </div>

                <div className="w-full justify-center flex">
                    <AllRefundOrders></AllRefundOrders>
                </div>
            </div>
        </div>
    )
}

export default ShopAllRefunds;