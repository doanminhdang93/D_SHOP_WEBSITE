import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import CreateProduct from '../../components/Shop/CreateProduct';

const ShopCreateProduct = () => {
    return (
        <div>
            <DashboardHeader></DashboardHeader>
            <div className="flex items-center justyfy-between w-full">
                <div className="800px:w-[330px] w-[80px]">
                    <DashboardSideBar active={4}></DashboardSideBar>
                </div>

                <div className="w-full justify-center flex">
                    <CreateProduct></CreateProduct>
                </div>
            </div>
        </div>
    ) 
}

export default ShopCreateProduct;