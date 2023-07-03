import React from 'react'
import { AiOutlineFolderAdd, AiOutlineGift } from 'react-icons/ai';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import {VscNewFile} from 'react-icons/vsc';
import {CiMoneyBill, CiSettings} from 'react-icons/ci';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { HiOutlineReceiptRefund } from 'react-icons/hi';

const DashboardSideBar = ({active}) => {
    return (
        <div className='w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10'>
            {/* single item */}
            <div className='w-full flex items-center p-4'>
                <Link to='/dashboard' className='w-full flex items-center'>
                    <RxDashboard size={30} color={`${active === 1 ? "#88b816" : "#555"}`}></RxDashboard>
                    <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 1 ? "text-[#88b816]" : "text-[#555]"}`}>
                        Dashboard
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4'>
                <Link to='/dashboard-orders' className='w-full flex items-center'>
                    <FiShoppingBag size={30} color={`${active === 2 ? "#88b816" : "#555"}`}></FiShoppingBag>
                    <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 2 ? "text-[#88b816]" : "text-[#555]"}`}>
                        Tất cả đơn hàng
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4'>
                <Link to='/dashboard-products' className='w-full flex items-center'>
                    <FiPackage size={30} color={`${active === 3 ? "#88b816" : "#555"}`}></FiPackage>
                    <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 3 ? "text-[#88b816]" : "text-[#555]"}`}>
                        Tất cả sản phẩm
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4'>
                <Link to='/dashboard-create-product' className='w-full flex items-center'>
                    <AiOutlineFolderAdd size={30} color={`${active === 4 ? "#88b816" : "#555"}`}></AiOutlineFolderAdd>
                    <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 4 ? "text-[#88b816]" : "text-[#555]"}`}>
                        Tạo sản phẩm
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4'>
                <Link to='/dashboard-events' className='w-full flex items-center'>
                    <MdOutlineLocalOffer size={30} color={`${active === 5 ? "#88b816" : "#555"}`}></MdOutlineLocalOffer>
                    <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 5 ? "text-[#88b816]" : "text-[#555]"}`}>
                        Tất cả sự kiện
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4'>
                <Link to='/dashboard-create-event' className='w-full flex items-center'>
                    <VscNewFile size={30} color={`${active === 6 ? "#88b816" : "#555"}`}></VscNewFile>
                    <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 6 ? "text-[#88b816]" : "text-[#555]"}`}>
                        Tạo sự kiện
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4'>
                <Link to='/dashboard-withdraw-money' className='w-full flex items-center'>
                    <CiMoneyBill size={30} color={`${active === 7 ? "#88b816" : "#555"}`}></CiMoneyBill>
                    <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 7 ? "text-[#88b816]" : "text-[#555]"}`}>
                        Rút tiền
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4'>
                <Link to='/dashboard-messages' className='w-full flex items-center'>
                    <BiMessageSquareDetail size={30} color={`${active === 8 ? "#88b816" : "#555"}`}></BiMessageSquareDetail>
                    <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 8 ? "text-[#88b816]" : "text-[#555]"}`}>
                        Trò chuyện
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4'>
                <Link to='/dashboard-coupons' className='w-full flex items-center'>
                    <AiOutlineGift size={30} color={`${active === 9 ? "#88b816" : "#555"}`}></AiOutlineGift>
                    <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 9 ? "text-[#88b816]" : "text-[#555]"}`}>
                        Mã giảm giá
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4'>
                <Link to='/dashboard-refunds' className='w-full flex items-center'>
                    <HiOutlineReceiptRefund size={30} color={`${active === 10 ? "#88b816" : "#555"}`}></HiOutlineReceiptRefund>
                    <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 10 ? "text-[#88b816]" : "text-[#555]"}`}>
                        Hoàn tiền đơn hàng
                    </h5>
                </Link>
            </div>

            <div className='w-full flex items-center p-4'>
                <Link to='/settings' className='w-full flex items-center'>
                    <CiSettings size={30} color={`${active === 11 ? "#88b816" : "#555"}`}></CiSettings>
                    <h5 className={`800px:block hidden pl-2 text-[18px] font-[400] ${active === 11 ? "text-[#88b816]" : "text-[#555]"}`}>
                        Cài đặt
                    </h5>
                </Link>
            </div>
        </div>
    )
}

export default DashboardSideBar;