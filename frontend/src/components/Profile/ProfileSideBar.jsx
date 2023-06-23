import React from 'react'
import { useNavigate } from 'react-router-dom';
import { RxPerson } from 'react-icons/rx';
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi';
import { AiOutlineMessage, AiOutlineLogin } from 'react-icons/ai';
import {MdOutlineTrackChanges} from 'react-icons/md';
import {RiLockPasswordLine} from 'react-icons/ri';
import {TbAddressBook} from 'react-icons/tb';
import axios from 'axios';
import { server } from '../../server';
import { toast } from 'react-toastify';


const ProfileSideBar = ({active,setActive}) => {
    const  navigate = useNavigate();
    const logoutHandle = () => {
        axios.get(`${server}/user/logout`, {withCredentials: true}).then((res)=>{
            toast.success(res.data.message);
            window.location.reload(true);
            navigate('/login');
        }).catch((err) => {
            console.log(err.response.data.message);
        })
    }
    return (
        <div className='w-full bg-white shadow-sm rounded-[10px] p-4 pt-8'>
            <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(1)}>
                <RxPerson size={20} color={active === 1 ? 'red' : ''}></RxPerson>
                <span className={`pl-3 ${active === 1 ? 'text-[red]' : ''} 800px:block hidden`}>
                    Thông tin cá nhân
                </span>
            </div>

            <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(2)}>
                <HiOutlineShoppingBag size={20} color={active === 2 ? 'red' : ''}></HiOutlineShoppingBag>
                <span className={`pl-3 ${active === 2 ? 'text-[red]' : ''} 800px:block hidden`}>
                    Đơn hàng đã đặt
                </span>
            </div>

            <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(3)}>
                <HiOutlineReceiptRefund size={20} color={active === 3 ? 'red' : ''}></HiOutlineReceiptRefund>
                <span className={`pl-3 ${active === 3 ? 'text-[red]' : ''} 800px:block hidden`}>
                    Hoàn tiền hoá đơn
                </span>
            </div>

            <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(4) || navigate('/inbox')}>
                <AiOutlineMessage size={20} color={active === 4 ? 'red' : ''}></AiOutlineMessage>
                <span className={`pl-3 ${active === 4 ? 'text-[red]' : ''} 800px:block hidden`}>
                    Trò chuyện
                </span>
            </div>
            
            <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(5)}>
                <MdOutlineTrackChanges size={20} color={active === 5 ? 'red' : ''}></MdOutlineTrackChanges>
                <span className={`pl-3 ${active === 5 ? 'text-[red]' : ''} 800px:block hidden`}>
                    Theo dõi đơn hàng
                </span>
            </div>

            <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(6)}>
                <RiLockPasswordLine size={20} color={active === 6 ? 'red' : ''}></RiLockPasswordLine>
                <span className={`pl-3 ${active === 6 ? 'text-[red]' : ''} 800px:block hidden`}>
                    Thay đổi mật khẩu
                </span>
            </div>

            <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(7)}>
                <TbAddressBook size={20} color={active === 7 ? 'red' : ''}></TbAddressBook>
                <span className={`pl-3 ${active === 7 ? 'text-[red]' : ''} 800px:block hidden`}>
                    Địa chỉ
                </span>
            </div>

            <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(8) || logoutHandle()}>
                <AiOutlineLogin size={20} color={active === 8 ? 'red' : ''}></AiOutlineLogin>
                <span className={`pl-3 ${active === 8 ? 'text-[red]' : ''} 800px:block hidden`}>
                    Đăng xuất
                </span>
            </div>
        </div>
    )
}

export default ProfileSideBar;