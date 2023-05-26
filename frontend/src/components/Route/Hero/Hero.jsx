import React from 'react'
import styles from '../../../styles/styles';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-white dark:bg-gray-200">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-black">Samsung galaxy S23 ultra</h1>
                <p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-md lg:text-lg dark:text-black">
                    Bước tiến lớn trong lịch sử thiết kế điện thoại thông minh: chất liệu tái chế cho một tương lai bền vững hơn hết.
                    Khoác lên Galaxy S23 Ultra là lớp kính tái chế và phim phủ PET không chỉ lộng lẫy ở mọi góc cạnh 
                    mà còn giúp siêu phẩm di động nổi bật khác biệt với tuyên ngôn sống xanh đột phá.
                </p>
                <Link to="/products" className="inline-block">
                    <div className={`${styles.button} mt-5`}>
                        <span className="text-[#fff] font-[Poppins] text-[18px]">
                            Mua ngay
                        </span>
                    </div>
                </Link>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img src={require("../../../static/images/S23.png")} alt="" />
            </div>                
        </div>
    </section>
  )
}

export default Hero;