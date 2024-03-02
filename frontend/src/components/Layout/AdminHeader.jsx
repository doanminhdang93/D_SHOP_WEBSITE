import React from "react";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { SlHandbag, SlPeople } from "react-icons/sl";
import { HiOutlineUserGroup } from "react-icons/hi";
import { CiMoneyBill } from "react-icons/ci";

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full h-[80px] bg-[#F6F5F5] shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/admin/dashboard">
          <img
            src={require("../../static/images/Logo.png")}
            alt=""
            className="w-[200px]"
          />
        </Link>
      </div>

      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/admin-orders" className="800px:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            ></FiShoppingBag>
          </Link>

          <Link to="/admin-sellers" className="800px:block hidden">
            <SlPeople
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            ></SlPeople>
          </Link>

          <Link to="/admin-users" className="800px:block hidden">
            <HiOutlineUserGroup
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            ></HiOutlineUserGroup>
          </Link>

          <Link to="/admin-products" className="800px:block hidden">
            <SlHandbag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            ></SlHandbag>
          </Link>

          <Link to="/admin-events" className="800px:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            ></MdOutlineLocalOffer>
          </Link>

          {/* <Link to="/admin-withdraw-request" className="800px:block hidden">
            <CiMoneyBill
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            ></CiMoneyBill>
          </Link> */}

          <Link to="/profile">
            <img
              src={`${user?.avatar?.url}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
