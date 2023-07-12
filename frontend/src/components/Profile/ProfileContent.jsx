import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineCamera,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { MdTrackChanges } from "react-icons/md";
import {
  deleteUserAddress,
  loadUser,
  updateUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import { toast } from "react-toastify";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { Country, State } from "country-state-city";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0); // go to top of screen
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(email, password, phoneNumber, name));
  };

  const handleImageChange = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      //console.log(reader.result);
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/user/update-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            dispatch(loadUser());
            toast.success("Cập nhật ảnh đại diện thành công!");
          })
          .catch((error) => {
            toast.error(error);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="w-full">
      {/* Profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${user?.avatar?.url}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label htmlFor="image" className="cursor-pointer">
                  <AiOutlineCamera></AiOutlineCamera>
                </label>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="w-full px-5">
            <form onSubmit={handleSubmit}>
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

                <div className="800px:w-[50%] w-[100%] relative">
                  <label className="block pb-2">Mật khẩu</label>
                  <input
                    type={visible ? "text" : "password"}
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-9 top-9 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    ></AiOutlineEye>
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-9 top-9 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    ></AiOutlineEyeInvisible>
                  )}
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

      {/* ChangePassword */}
      {active === 6 && (
        <div>
          <ChangePassword></ChangePassword>
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
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { field: "id", headerName: "Mã đơn hàng", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 130,
      flex: 0.8,
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
            <Link to={`/user/order/${params.id}`}>
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
        itemsQty: item.cart.length,
        total: "$" + item.totalPrice,
        status: item.status,
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
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const eligibleOrders =
    orders &&
    orders.filter(
      (item) =>
        item.status === "Đang xử lý việc hoàn tiền" ||
        item.status === "Hoàn tiền thành công"
    );

  const columns = [
    { field: "id", headerName: "Mã đơn hàng", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 130,
      flex: 0.8,
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
            <Link to={`/user/order/${params.id}`}>
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

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "$" + item.totalPrice,
        status: item.status,
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
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const columns = [
    { field: "id", headerName: "Mã đơn hàng", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 130,
      flex: 0.8,
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
            <Link to={`/user/track-order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
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
        itemsQty: item.cart.length,
        total: "$" + item.totalPrice,
        status: item.status,
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

const ChangePassword = () => {
  const [visible, setVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Thay đổi mật khẩu
      </h1>
      <div className="w-full">
        <form
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className="800px:w-[50%] w-[100%] mt-5 relative">
            <label className="block pb-2">Nhập mật khẩu cũ</label>
            <input
              type={visible ? "text" : "password"}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            ></input>
            {visible ? (
              <AiOutlineEye
                className="absolute right-9 top-9 cursor-pointer"
                size={25}
                onClick={() => setVisible(false)}
              ></AiOutlineEye>
            ) : (
              <AiOutlineEyeInvisible
                className="absolute right-9 top-9 cursor-pointer"
                size={25}
                onClick={() => setVisible(true)}
              ></AiOutlineEyeInvisible>
            )}
          </div>
          <div className="800px:w-[50%] w-[100%] mt-2 relative">
            <label className="block pb-2">Nhập mật khẩu mới</label>
            <input
              type={visible ? "text" : "password"}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            ></input>
            {visible ? (
              <AiOutlineEye
                className="absolute right-9 top-9 cursor-pointer"
                size={25}
                onClick={() => setVisible(false)}
              ></AiOutlineEye>
            ) : (
              <AiOutlineEyeInvisible
                className="absolute right-9 top-9 cursor-pointer"
                size={25}
                onClick={() => setVisible(true)}
              ></AiOutlineEyeInvisible>
            )}
          </div>
          <div className="w-[100%] 800px:w-[50%] mt-2 relative">
            <label className="block pb-2">Xác nhận mật khẩu</label>
            <input
              type={visible ? "text" : "password"}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
            {visible ? (
              <AiOutlineEye
                className="absolute right-9 top-9 cursor-pointer"
                size={25}
                onClick={() => setVisible(false)}
              ></AiOutlineEye>
            ) : (
              <AiOutlineEyeInvisible
                className="absolute right-9 top-9 cursor-pointer"
                size={25}
                onClick={() => setVisible(true)}
              ></AiOutlineEyeInvisible>
            )}
          </div>
          <input
            className={`w-[50%] mr-4 h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
            required
            value="Cập nhật"
            type="submit"
          ></input>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Mặc định",
    },
    {
      name: "Cơ quan",
    },
    {
      name: "Nhà riêng",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addressType === "" || country === "" || city === "") {
      toast.error("Vui lòng điền đầy đủ thông tin!");
    } else {
      dispatch(
        updateUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setAddressType("");
    }
  };
  const handleDelete = (item) => {
    dispatch(deleteUserAddress(item._id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center">
          <div className="800px:w-[40%] w-[80%] h-[85vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              ></RxCross1>
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Thêm địa chỉ mới
            </h1>
            <div className="w-full">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Quốc gia</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block pb-2">
                        Chọn quốc gia
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Thành phố</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Chọn thành phố
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Địa chỉ 1</label>
                    <input
                      type="text"
                      className={`${styles.input}`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Địa chỉ 2</label>
                    <input
                      type="text"
                      className={`${styles.input}`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Mã vùng</label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Loại địa chỉ</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-full border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Chọn loại địa chỉ
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer`}
                      readOnly
                      required
                      value="Gửi đi"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between ">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          Địa chỉ của tôi
        </h1>
        <div
          className={`${styles.button} rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-white">Thêm mới</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            key={index}
            className="w-full bg-white h-[70px] rounded-[4px] flex items-center mb-3 px-3 shadow justify-between pr-10"
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6>(+{item.zipCode})</h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[10px] 800px:text-[15px]">{user && user.phoneNumber}</h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[10px] 800px:text-[15px]">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              ></AiOutlineDelete>
            </div>
          </div>
        ))}
      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          Bạn chưa có địa chỉ nào!
        </h5>
      )}
    </div>
  );
};
export default ProfileContent;
