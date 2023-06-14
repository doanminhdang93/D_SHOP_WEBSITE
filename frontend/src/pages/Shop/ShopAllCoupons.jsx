import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import AllCoupons from '../../components/Shop/AllCoupons';

const ShopAllCoupons = () => {
    return (
        <div>
            <DashboardHeader></DashboardHeader>
            <div className="flex justify-between w-full">
                <div className="800px:w-[330px] w-[80px]">
                    <DashboardSideBar active={9}></DashboardSideBar>
                </div>

                <div className="w-full justify-center flex">
                    <AllCoupons></AllCoupons>
                </div>
            </div>
        </div>
    )
}

export default ShopAllCoupons;