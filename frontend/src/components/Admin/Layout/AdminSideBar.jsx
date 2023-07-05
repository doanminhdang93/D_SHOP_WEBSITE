import React from 'react'
import { FiShoppingBag } from 'react-icons/fi';
import { RxDashboard } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import {CiMoneyBill} from 'react-icons/ci';
import {SlHandbag, SlPeople} from 'react-icons/sl';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { AiOutlineSetting } from 'react-icons/ai';

const AdminSideBar = ({active}) => {
    return (
        <div className='w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10'>
            {/* single item */}
            <div className='w-full flex items-center p-4'>
                <Link to='/admin/dashboard' className='w-full flex items-center'>
                    <RxDashboard size={30} color={`${active === 1 ? "#88b816" : "#555"}`}></RxDashboard>
                    <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 1 ? "text-[#88b816]" : "text-[#555]"}`}>
                        Dashboard
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4'>
                <Link to='/admin-orders' className='w-full flex items-center'>
                    <FiShoppingBag size={30} color={`${active === 2 ? "#88b816" : "#555"}`}></FiShoppingBag>
                    <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 2 ? "text-[#88b816]" : "text-[#555]"}`}>
                        Tất cả đơn hàng
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4'>
                <Link to='/admin-sellers' className='w-full flex items-center'>
                    <SlPeople size={30} color={`${active === 3 ? "#88b816" : "#555"}`}></SlPeople>
                    <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 3 ? "text-[#88b816]" : "text-[#555]"}`}>
                        Tất cả người bán
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4'>
                <Link to='/admin-users' className='w-full flex items-center'>
                    <HiOutlineUserGroup size={30} color={`${active === 4 ? "#88b816" : "#555"}`}></HiOutlineUserGroup>
                    <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 4 ? "text-[#88b816]" : "text-[#555]"}`}>
                        Tất cả người dùng
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4'>
                <Link to='/admin-products' className='w-full flex items-center'>
                    <SlHandbag size={30} color={`${active === 5 ? "#88b816" : "#555"}`}></SlHandbag>
                    <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 5 ? "text-[#88b816]" : "text-[#555]"}`}>
                        Tất cả sản phẩm
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4'>
                <Link to='/admin-events' className='w-full flex items-center'>
                    <MdOutlineLocalOffer size={30} color={`${active === 6 ? "#88b816" : "#555"}`}></MdOutlineLocalOffer>
                    <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 6 ? "text-[#88b816]" : "text-[#555]"}`}>
                        Tất cả sự kiện
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4'>
                <Link to='/admin-withdraw-request' className='w-full flex items-center'>
                    <CiMoneyBill size={30} color={`${active === 7 ? "#88b816" : "#555"}`}></CiMoneyBill>
                    <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 7 ? "text-[#88b816]" : "text-[#555]"}`}>
                        Yêu cầu rút tiền
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4'>
                <Link to='/profile' className='w-full flex items-center'>
                    <AiOutlineSetting size={30} color={`${active === 8 ? "#88b816" : "#555"}`}></AiOutlineSetting>
                    <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 8 ? "text-[#88b816]" : "text-[#555]"}`}>
                        Cài đặt
                    </h5>
                </Link>
            </div>

        </div>
    )
}

export default AdminSideBar;