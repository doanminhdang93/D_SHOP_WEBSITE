import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';
import WithdrawMoney from '../../components/Shop/WithdrawMoney';

const ShopWithdrawMoneyPage = () => {
    return (
        <div>
            <DashboardHeader></DashboardHeader>
            <div className="flex items-start justify-between w-full">
                <div className="800px:w-[330px] w-[80px]">
                    <DashboardSideBar active={7}></DashboardSideBar>
                </div>
                <WithdrawMoney></WithdrawMoney>
            </div>
        </div>
    )
}

export default ShopWithdrawMoneyPage;