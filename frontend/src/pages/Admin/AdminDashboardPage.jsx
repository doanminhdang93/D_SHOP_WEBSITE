import React from 'react';
import AdminHeader from '../../components/Layout/AdminHeader';
import AdminSideBar from '../../components/Admin/Layout/AdminSideBar';
import AdminDashboardMain from '../../components/Admin/AdminDashboardMain';

const AdminDashboardPage = () => {
    return (
        <div> 
            <AdminHeader></AdminHeader>
            <div className="w-full flex">
                <div className='flex items-start justify-between w-full'>
                    <div className='w-[80px] 800px:w-[330px]'>
                        <AdminSideBar active={1}></AdminSideBar>
                    </div>
                    <AdminDashboardMain></AdminDashboardMain>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboardPage;