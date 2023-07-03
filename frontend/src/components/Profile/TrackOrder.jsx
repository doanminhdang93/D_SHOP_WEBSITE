import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      {" "}
      <>
        {data && data?.status === "Đang xử lý" ? (
          <h1 className="text-[20px] text-center">Đơn hàng đang được xử lý!</h1>
        ) : data?.status === "Đã bàn giao cho đơn vị vận chuyển" ? (
          <h1 className="text-[20px]">
            Đơn hàng của bạn đã được bàn giao cho đơn vị vận chuyển!
          </h1>
        ) : data?.status === "Đang giao hàng" ? (
          <h1 className="text-[20px]">
            Đơn hàng của bạn đang được vận chuyển!
          </h1>
        ) : data?.status === "Đã nhận hàng" ? (
          <h1 className="text-[20px]">
            Đơn hàng của bạn đã đến nơi. Sẽ có người giao hàng cho bạn trong
            thời gian sớm nhất!
          </h1>
        ) : data?.status === "Đang trên đường" ? (
          <h1 className="text-[20px]">
            Đơn hàng của bạn đang được vận chuyển!
          </h1>
        ) : data?.status === "Đã giao hàng" ? (
          <h1 className="text-[20px]">
            Đơn hàng của bạn đã được giao thành công!
          </h1>
        ) : data?.status === "Đang xử lý việc hoàn tiền" ? (
          <h1 className="text-[20px]">Việc hoàn tiền đang được xử lý!</h1>
        ) : data?.status === "Hoàn tiền thành công" ? (
          <h1 className="text-[20px]">Đã hoàn tiền thành công!</h1>
        ) : null}
      </>
    </div>
  );
};

export default TrackOrder;
