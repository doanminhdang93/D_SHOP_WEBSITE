import React, { useState } from "react";
import { backend_url } from "../../server";
import { useSelector } from "react-redux";
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { MdOutlineTrackChanges } from "react-icons/md";

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full">
      {/* Profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backend_url}${user?.avatar}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera></AiOutlineCamera>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className="800px:w-[50%] w-[100%]">
                  <label className="block pb-2">Họ & Tên</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>

                <div className="800px:w-[50%] w-[100%]">
                  <label className="block pb-2">Email</label>
                  <input
                    type="email"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className="800px:w-[50%] w-[100%]">  
                  <label className="block pb-2">Số điện thoại</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  ></input>
                </div>

                <div className="800px:w-[50%] w-[100%]">
                  <label className="block pb-2">Mã vùng</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className="800px:w-[50%] w-[100%]">
                  <label className="block pb-2">Địa chỉ 1</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  ></input>
                </div>

                <div className="800px:w-[50%] w-[100%]">
                  <label className="block pb-2">Địa chỉ 2</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  ></input>
                </div>
              </div>

              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Cập nhật"
                type="submit"
              ></input>
            </form>
          </div>
        </>
      )}

      {/* Orders */}
      {active === 2 && (
        <div>
          <AllOrders></AllOrders>
        </div>
      )}

      {/* Refund page */}
      {active === 3 && (
        <div>
          <AllRefundOrders></AllRefundOrders>
        </div>
      )}

      {/* TrackOrder */}
      {active === 5 && (
        <div>
          <TrackOrder></TrackOrder>
        </div>
      )}

      {/* PaymentMethods */}
      {active === 6 && (
        <div>
          <PaymentMethod></PaymentMethod>
        </div>
      )}

      {/* User Address */}
      {active === 7 && (
        <div>
          <Address></Address>
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: "1434nsajasjq6wf7yasf09032002",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 999,
      orderStatus: "Đang xử lý",
    },
  ];

  const columns = [
    { field: "id", headerName: "Mã đơn hàng", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Đã giao hàng"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Tổng",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "$" + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      ></DataGrid>
    </div>
  );
};

const AllRefundOrders = () => {
  const orders = [
    {
      _id: "1434nsajasjq6wf7yasf09032002",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 999,
      orderStatus: "Đang xử lý",
    },
  ];

  const columns = [
    { field: "id", headerName: "Mã đơn hàng", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Đã giao hàng"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Tổng",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "$" + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      ></DataGrid>
    </div>
  );
};

const TrackOrder = () => {
  const orders = [
    {
      _id: "1434nsajasjq6wf7yasf09032002",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 999,
      orderStatus: "Đang xử lý",
    },
  ];

  const columns = [
    { field: "id", headerName: "Mã đơn hàng", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Đã giao hàng"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Tổng",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "$" + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      ></DataGrid>
    </div>
  );
};

const PaymentMethod = () => {
    return (
        <div className="w-full px-5">
            <div className="flex w-full items-center justify-between ">
                <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
                    Phương thức thanh toán
                </h1>
                <div className={`${styles.button} rounded-md`}>
                    <span className="text-white">
                        Thêm mới
                    </span>
                </div>
            </div>
            <br />
            <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10" >
                <div className="flex items-center">
                    <img src="http://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg" alt="" />
                    <h5 className="pl-5 font-[600]">
                        Đoàn Minh Đăng
                    </h5>
                </div>
                <div className="pl-8 flex items-center">
                    <h6>1234 **** **** ****</h6>
                    <h5 className="pl-6">09/2023</h5>
                </div>
                <div className="min-w-[10%] flex items-center justify-between pl-8">
                    <AiOutlineDelete size={25} className="cursor-pointer"></AiOutlineDelete>
                </div>
            </div>
        </div>
    )
}

const Address = () => {

    return (
        <div className="w-full px-5">
            <div className="flex w-full items-center justify-between ">
                <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
                    Địa chỉ của tôi
                </h1>
                <div className={`${styles.button} rounded-md`}>
                    <span className="text-white">
                        Thêm mới
                    </span>
                </div>
            </div>
            <br />
            <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10" >
                <div className="flex items-center">
                    <h5 className="pl-5 font-[600]">
                        Địa chỉ mặc định 
                    </h5>
                </div>
                <div className="pl-8 flex items-center">
                    <h6>Văn Phú, Hà Đông, Hà Nội</h6>
                </div>
                <div className="pl-8 flex items-center">
                    <h6>0379239309</h6>
                </div>
                <div className="min-w-[10%] flex items-center justify-between pl-8">
                    <AiOutlineDelete size={25} className="cursor-pointer"></AiOutlineDelete>
                </div>
            </div>
        </div>
    )
}
export default ProfileContent;
