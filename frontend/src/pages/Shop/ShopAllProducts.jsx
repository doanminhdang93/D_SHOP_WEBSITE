import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import AllProducts from '../../components/Shop/AllProducts';

const ShopAllProducts = () => {
    return (
        <div>
            <DashboardHeader></DashboardHeader>
            <div className="flex justify-between w-full">
                <div className="800px:w-[330px] w-[80px]">
                    <DashboardSideBar active={3}></DashboardSideBar>
                </div>

                <div className="w-full justify-center flex">
                    <AllProducts></AllProducts>
                </div>
            </div>
        </div>
    )
}

export default ShopAllProducts;