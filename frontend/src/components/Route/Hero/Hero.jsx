import React from 'react'
import styles from '../../../styles/styles';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramFlex}`}
        style={{ 
            // backgroundImage: "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)"
        }}
    >
        {/* <div className={`${styles.section} w-90% 800px:w-[60%]`}>
            <h1 className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}>
                Bộ sưu tập <br/> nội thất 2023
            </h1>
            <p className="pt-5 text-[16px] font-Roboto font-[400] text-[#000000ba]">
                Thiết kế đơn giản, thoáng, tiện nghi và tối đa không gian sử dụng <br/>
                cùng với màu sắc hiện đại tươi mới sẽ không làm bạn thất vọng. 
            </p>
            <Link to="/products" className='inline-block'>
                <div className={`${styles.button} mt-5`}>
                    <span className="text-[#fff] font-Roboto text-[18px] font-[400]">
                        Đặt mua ngay
                    </span>
                </div>
            </Link>
        </div> */}
    </div>
  )
}

export default Hero;