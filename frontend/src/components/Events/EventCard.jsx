import React, { useState } from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";

const EventCard = ({data}) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [select, setSelect] = useState(0);

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Sản phẩm đã có trong giỏ hàng!");
    } else {
      if (data.stock < 1) {
        toast.error("Số lượng sản phẩm có hạn!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Sản phẩm đã được thêm vào giỏ hàng thành công!");
      }
    }
  };
  return (
    <>
      {data &&
        data.map((data) => (
          <div
            className="w-full block bg-white rounded-lg  mb-12 lg:flex p-2"
          >
            <div className="w-full 800px:w-[50%]">
              <img
                src={`${data && data.images[select]?.url}`}
                alt=""
                className="w-[80%]"
              ></img>
              <div className="w-full flex">
                {data &&
                  data.images.map((i, index) => (
                    <div
                      key={index}
                      className={`${
                        select === 0 ? "border" : "null"
                      } cursor-pointer`}
                    >
                      <img
                        src={`${i?.url}`}
                        alt=""
                        className="h-[150px] overflow-hidden mr-3 mt-3"
                        onClick={() => setSelect(index)}
                      ></img>
                    </div>
                  ))}
                <div
                  className={`${
                    select === 1 ? "border" : "null"
                  } cursor-pointer`}
                ></div>
              </div>
            </div>
            <div className="w-full 800px:w-[50%] pl-5 pt-5">
              <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
              <p>{data?.description}</p>
              <div className="flex py-2 justify-between">
                <div className="flex">
                  <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                    {data?.originalPrice}$
                  </h5>
                  <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                    {data?.discountPrice}$
                  </h5>
                </div>
                <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
                  {data?.sold_out} Đã bán
                </span>
              </div>
              <CountDown data={data} />
              <br />
              <div className="flex items-center">
                <Link to={`/product/${data?._id}?isEvent=true`}>
                  <div className={`${styles.button} text-[#fff]`}>
                    Xem chi tiết
                  </div>
                </Link>
                <div
                  className={`${styles.button} text-[#fff] ml-5`}
                  onClick={() => addToCartHandler(data)}
                >
                  Thêm vào giỏ
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default EventCard;
