import React from "react";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { footerCompanyLinks, footerProductLinks, footerSupportLinks } from "../../static/data";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#000] text-[#88b816]">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#342ac8] py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#88b816]">Theo dõi</span> 
          <span className="text-white"> chúng tôi để nhận
          những thông tin mới nhất</span>
        </h1>

        <div>
          <input
            type="text"
            required
            placeholder="Nhập email của bạn..."
            className="text-gray-800 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          ></input>
          <button className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full">
            Gửi đi
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-10 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            src={require("../../static/images/LogoF.png")}
            alt=""
            style={{ width: "200px" }}
          />
          <br></br>
          <div className="flex items-center mt-[10px]">
            <AiFillFacebook size={25} className="cursor-pointer " />
            <AiOutlineTwitter
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillInstagram
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillYoutube
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillGithub
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
          </div>
        </ul>

        <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold text-[25px]">
                Công ty
            </h1>
            {
                footerProductLinks.map((link) =>(
                    <li key={link.name}>
                        <Link to={link.link} className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6">
                            {link.name}
                        </Link>
                    </li>
                ))
            }
        </ul>

        <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold text-[25px]">
                Cửa hàng
            </h1>
            {
                footerCompanyLinks.map((link) =>(
                    <li key={link.name}>
                        <Link to={link.link} className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6">
                            {link.name}
                        </Link>
                    </li>
                ))
            }
        </ul>

        <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold text-[25px]">
                Hỗ trợ
            </h1>
            {
                footerSupportLinks.map((link) =>(
                    <li key={link.name}>
                        <Link to={link.link} className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6">
                            {link.name}
                        </Link>
                    </li>
                ))
            }
        </ul>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2023 Copyright. All rights reserved.</span>
        <span>Chính sách · Quyền riêng tư</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>      
    </div>
  );
};

export default Footer;
