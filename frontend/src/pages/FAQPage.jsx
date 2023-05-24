import React, { useState } from 'react'
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from '../styles/styles';
import { IoIosArrowForward } from 'react-icons/io';
import {RxCross1} from 'react-icons/rx';

const FAQPage = () => {
  return (
    <div>
        <Header activeHeading={5}></Header>
        <Faq></Faq>
        <Footer></Footer>
    </div>
  )
}
const Faq = () => {
    const [activeTab,setActiveTab] = useState(0);
    const toggleTab = (tab) =>{
        if(activeTab === tab){
            setActiveTab(0);
        }else{
            setActiveTab(tab);
        }
    }
    return (
        <div className={`${styles.section} my-8`}>
            <h2 className='text-3xl font-bold text-gray-900 mb-8'>
                Câu hỏi thường gặp
            </h2>
            <div className="mx-auto space-y-4">
                {/* single FAQ */}
                <div className="border-b border-gray-200 pb-4">
                    <button
                        className='flex items-center justify-between w-full'
                        onClick={() => toggleTab(1)}
                    >
                        <span className="text-lg font-medium text-gray-900">
                            Làm thế nào để theo dõi đơn hàng của tôi?
                        </span>
                        {
                            activeTab === 1 ? (
                                <RxCross1></RxCross1>
                            ) : <IoIosArrowForward></IoIosArrowForward>
                        }
                    </button>
                    {
                        activeTab === 1 && (
                            <div className="mt-4">
                                <p className="text-base text-gray-500">
                                    Bạn có thể theo dõi đơn đặt hàng của mình bằng cách 
                                    nhấp vào liên kết theo dõi trong email xác nhận giao hàng hoặc 
                                    bằng cách đăng nhập vào tài khoản của bạn trên trang web của chúng tôi 
                                    và xem chi tiết đơn đặt hàng.
                                </p>
                            </div>
                        )
                    }
                </div>

                <div className="border-b border-gray-200 pb-4">
                    <button
                        className='flex items-center justify-between w-full'
                        onClick={() => toggleTab(2)}
                    >
                        <span className="text-lg font-medium text-gray-900">
                            Chính sách đổi trả của shop như thế nào? 
                        </span>
                        {
                            activeTab === 2 ? (
                                <RxCross1></RxCross1>
                            ) : <IoIosArrowForward></IoIosArrowForward>
                        }
                    </button>
                    {
                        activeTab === 2 && (
                            <div className="mt-4">
                                <p className="text-base text-gray-500">
                                    Nếu bạn không hài lòng với giao dịch mua hàng của bên shop, 
                                    chúng tôi chấp nhận đổi trả lại trong vòng 10 ngày kể từ ngày giao hàng. 
                                    Vui lòng gửi email cho chúng tôi theo địa chỉ <span className='font-bold'>support@Dshop.com </span>
                                    với số đơn đặt hàng của bạn và giải thích ngắn gọn về lý do bạn trả lại mặt hàng.
                                </p>
                            </div>
                        )
                    }
                </div>

                <div className="border-b border-gray-200 pb-4">
                    <button
                        className='flex items-center justify-between w-full'
                        onClick={() => toggleTab(3)}
                    >
                        <span className="text-lg font-medium text-gray-900">
                            Làm cách nào để liên hệ với bộ phận hỗ trợ khách hàng?
                        </span>
                        {
                            activeTab === 3 ? (
                                <RxCross1></RxCross1>
                            ) : <IoIosArrowForward></IoIosArrowForward>
                        }
                    </button>
                    {
                        activeTab === 3 && (
                            <div className="mt-4">
                                <p className="text-base text-gray-500">
                                    Bạn có thể liên hệ với nhóm hỗ trợ khách hàng của chúng tôi bằng cách gửi email cho chúng tôi theo địa chỉ <span className='font-bold'>support@Dshop.com </span> 
                                    hoặc gọi cho chúng tôi theo số <span className='font-bold'>0123456789</span> trong khoảng thời gian từ 9 giờ sáng đến 5 giờ chiều, từ Thứ Hai đến Thứ Sáu.
                                </p>
                            </div>
                        )
                    }
                </div> 

                <div className="border-b border-gray-200 pb-4">
                    <button
                        className='flex items-center justify-between w-full'
                        onClick={() => toggleTab(4)}
                    >
                        <span className="text-lg font-medium text-gray-900">
                            Tôi có thể thay đổi hoặc hủy đơn đặt hàng của mình không?
                        </span>
                        {
                            activeTab === 4 ? (
                                <RxCross1></RxCross1>
                            ) : <IoIosArrowForward></IoIosArrowForward>
                        }
                    </button>
                    {
                        activeTab === 4 && (
                            <div className="mt-4">
                                <p className="text-base text-gray-500">
                                    Thật không may, một khi đơn đặt hàng đã được đặt, 
                                    chúng tôi không thể thực hiện thay đổi hoặc hủy bỏ. 
                                    Nếu bạn không muốn các mặt hàng bạn đã đặt hàng nữa, 
                                    bạn có thể trả lại chúng để được hoàn lại tiền trong vòng 10 ngày kể từ ngày giao hàng.
                                </p>
                            </div>
                        )
                    }
                </div>  

                <div className="border-b border-gray-200 pb-4">
                    <button
                        className='flex items-center justify-between w-full'
                        onClick={() => toggleTab(5)}
                    >
                        <span className="text-lg font-medium text-gray-900">
                            Shop có ship qua nước ngoài được không?
                        </span>
                        {
                            activeTab === 5 ? (
                                <RxCross1></RxCross1>
                            ) : <IoIosArrowForward></IoIosArrowForward>
                        }
                    </button>
                    {
                        activeTab === 5 && (
                            <div className="mt-4">
                                <p className="text-base text-gray-500">
                                    Rất tiếc, hiện tại chúng tôi chỉ giao hàng trong phạm vi lãnh thổ Việt Nam.
                                </p>
                            </div>
                        )
                    }
                </div> 

                <div className="border-b border-gray-200 pb-4">
                    <button
                        className='flex items-center justify-between w-full'
                        onClick={() => toggleTab(6)}
                    >
                        <span className="text-lg font-medium text-gray-900">
                            Phương thức thanh toán nào được chấp nhận?
                        </span>
                        {
                            activeTab === 6 ? (
                                <RxCross1></RxCross1>
                            ) : <IoIosArrowForward></IoIosArrowForward>
                        }
                    </button>
                    {
                        activeTab === 6 && (
                            <div className="mt-4">
                                <p className="text-base text-gray-500">
                                    Chúng tôi chấp nhận các phương thức thanh toán như visa, mastercard, paypal, COD,...
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}



export default FAQPage;