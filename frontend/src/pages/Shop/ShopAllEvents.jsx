import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import AllEvents from '../../components/Shop/AllEvents';

const ShopAllEvents = () => {
    return (
        <div>
            <DashboardHeader></DashboardHeader>
            <div className="flex justify-between w-full">
                <div className="800px:w-[330px] w-[80px]">
                    <DashboardSideBar active={5}></DashboardSideBar>
                </div>

                <div className="w-full justify-center flex">
                    <AllEvents></AllEvents>
                </div>
            </div>
        </div>
    )
}

export default ShopAllEvents;