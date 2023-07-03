import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/styles";

const WithdrawMoney = () => {
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);

  const [deliveredOrder, setDeliveredOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));

    const orderData =
      orders && orders.filter((item) => item.status === "Đã giao hàng");
    setDeliveredOrder(orderData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const totalEarningWithoutTax =
    deliveredOrder &&
    deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0);

  const serviceCharge = totalEarningWithoutTax * 0.1;
  const availableBalance = (totalEarningWithoutTax - serviceCharge).toFixed(2);

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center flex-col justify-center">
        <h5 className="text-[20px] pb-4">Số dư còn lại: ${availableBalance}</h5>
        <div className={`${styles.button} text-white !h-[42px] `}>
            Rút tiền
        </div>
      </div>
    </div>
  );
};

export default WithdrawMoney;
