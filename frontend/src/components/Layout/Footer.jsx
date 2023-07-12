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