import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import DashboardMain from '../../components/Shop/DashboardMain';

const ShopDashboardPage = () => {
    return (
        <div>
            <DashboardHeader></DashboardHeader>
            <div className="flex items-start justify-between w-full">
                <div className="800px:w-[330px] w-[80px]">
                    <DashboardSideBar active={1}></DashboardSideBar>
                </div>
                <DashboardMain></DashboardMain>
            </div>
        </div>
    )
}

export default ShopDashboardPage;