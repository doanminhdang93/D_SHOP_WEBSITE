import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { backend_url, server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        { status },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Đã cập nhật đơn hàng!");
        navigate("/dashboard-orders");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async () => {
    await axios
      .put(
        `${server}/order/order-refund-success/${id}`,
        { status },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Đã cập nhật đơn hàng!");
        dispatch(getAllOrdersOfShop(seller._id));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className={`${styles.section} py-4 min-h-screen`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson"></BsFillBagFill>
          <h1 className="pl-2 text-[25px]">Chi tiết đơn hàng</h1>
        </div>
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} !rounded-[4px] text-white font-[500] !h-[45px] text-[18px]`}
          >
            Danh sách
          </div>
        </Link>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Mã đơn hàng: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Ngày tạo: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {data &&
        data?.cart.map((item) => (
          <div className="w-full flex items-start mb-5" key={item._id}>
            <img
              src={`${item.images[0]?.url}`}
              alt=""
              className="w-[80px] h-[80px]"
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                ${item.discountPrice} x {item.qty}
              </h5>
            </div>
          </div>
        ))}
      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Tổng tiền <strong>${data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Địa chỉ giao hàng:</h4>
          <h4 className="pt-3 text-[20px]">
            {data?.shippingAddress.address1 +
              " " +
              data?.shippingAddress.address2}
          </h4>
          <h4 className="text-[20px]">{data?.shippingAddress.country}</h4>
          <h4 className="text-[20px]">{data?.shippingAddress.city}</h4>
          <h4 className="text-[20px]">{data?.user?.phoneNumber}</h4>
        </div>

        <div className="w-full 800px:w-[40%]">
          <h4 className="text-[20px] pt-3">Thông tin thanh toán:</h4>
          <h4>
            Trạng thái:{" "}
            {data?.paymentInfo?.status
              ? data?.paymentInfo?.status
              : "Chưa thanh toán"}
          </h4>
        </div>
      </div>
      <br />
      <br />
      <h4 className="pt-3 text-[20px] font-[600]">Trạng thái đơn hàng</h4>
      {data?.status !== "Đang xử lý việc hoàn tiền" &&
        data?.status !== "Hoàn tiền thành công" && (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          >
            {[
              "Đang xử lý",
              "Đã bàn giao cho đơn vị vận chuyển",
              "Đang giao hàng",
              "Đã nhận hàng",
              "Đang trên đường",
              "Đã giao hàng",
            ]
              .slice(
                [
                  "Đang xử lý",
                  "Đã bàn giao cho đơn vị vận chuyển",
                  "Đang giao hàng",
                  "Đã nhận hàng",
                  "Đang trên đường",
                  "Đã giao hàng",
                ].indexOf(data?.status)
              )
              .map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
          </select>
        )}

      {data?.status === "Đang xử lý việc hoàn tiền" ||
        data?.status === "Hoàn tiền thành công" ? (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          >
            {["Đang xử lý việc hoàn tiền", "Hoàn tiền thành công"]
              .slice(
                ["Đang xử lý việc hoàn tiền", "Hoàn tiền thành công"].indexOf(
                  data?.status
                )
              )
              .map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
          </select>
        ):null}

      <div
        className={`${styles.button} !rounded-[4px] text-white font-[500] !h-[45px] text-[18px]`}
        onClick={
          data?.status !== "Đang xử lý việc hoàn tiền"
            ? orderUpdateHandler
            : refundOrderUpdateHandler
        }
      >
        Cập nhật
      </div>
    </div>
  );
};

export default OrderDetails;
