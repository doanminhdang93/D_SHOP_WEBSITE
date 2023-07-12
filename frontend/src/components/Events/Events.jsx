import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import CountDown from "./CountDown";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  const [select, setSelect] = useState(0);
  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Sự kiện đang diễn ra</h1>
          </div>

          <div className="w-full grid">
            {allEvents?.length !== 0 && (
              <div
              className="w-full block bg-white rounded-lg  mb-12 lg:flex p-2"
            >
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${allEvents[0] && allEvents[0].images[select]?.url}`}
                  alt=""
                  className="w-[80%]"
                ></img>
                <div className="w-full flex">
                  {allEvents[0] &&
                    allEvents[0].images.map((i, index) => (
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
                <h2 className={`${styles.productTitle}`}>{allEvents[0]?.name}</h2>
                <p>{allEvents[0]?.description}</p>
                <div className="flex py-2 justify-between">
                  <div className="flex">
                    <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                      {allEvents[0]?.originalPrice}$
                    </h5>
                    <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                      {allEvents[0]?.discountPrice}$
                    </h5>
                  </div>
                  <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
                    {allEvents[0]?.sold_out} Đã bán
                  </span>
                </div>
                <CountDown data={allEvents[0]} />
                <br />
              </div>
            </div>
            )}
            <h4 className="text-[20px] mb-5">{allEvents?.length === 0 && "Chưa có sự kiện nào!"}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
