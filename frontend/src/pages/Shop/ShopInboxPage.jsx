import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import DashboardMessages from '../../components/Shop/DashboardMessages.jsx'

const ShopInboxPage = () => {
    return (
        <div>
            <DashboardHeader></DashboardHeader>
            <div className="flex items-start justify-between w-full">
                <div className="800px:w-[330px] w-[80px]">
                    <DashboardSideBar active={8}></DashboardSideBar>
                </div>
                <DashboardMessages></DashboardMessages>
            </div>
        </div>
    )
}

export default ShopInboxPage