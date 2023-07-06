import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux/actions/user";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipCode] = useState(seller && seller.zipCode);

  const dispatch = useDispatch();

  const handleImageChange = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/shop/update-shop-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            dispatch(loadSeller());
            toast.success("Ảnh đại diện đã được cập nhật thành công!");
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/shop/update-seller-info`,
        {
          name,
          address,
          zipCode,
          phoneNumber,
          description,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Thông tin cửa hàng đã được cập nhật thành công!");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={avatar ? avatar : `${seller.avatar?.url}`}
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
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

        {/* shop info */}
        <form className="flex flex-col items-center" onSubmit={updateHandler}>
          <div className="w-[100%] 800px:w-[50%] mt-5 flex flex-col items-center">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Tên cửa hàng</label>
            </div>
            <input
              type="name"
              placeholder={`${seller.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] 800px:w-[50%] mt-5 flex flex-col items-center">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Mô tả cửa hàng</label>
            </div>
            <input
              type="name"
              placeholder={`${
                seller?.description
                  ? seller.description
                  : "Nhập mô tả cửa hàng..."
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            />
          </div>

          <div className="w-[100%] 800px:w-[50%] mt-5 flex flex-col items-center">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Địa chỉ cửa hàng</label>
            </div>
            <input
              type="name"
              placeholder={`${seller?.address}`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] 800px:w-[50%] mt-5 flex flex-col items-center">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Số điện thoại</label>
            </div>
            <input
              type="name"
              placeholder={`${seller?.phoneNumber}`}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] 800px:w-[50%] mt-5 flex flex-col items-center">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Mã vùng</label>
            </div>
            <input
              type="number"
              placeholder={`${seller?.zipCode}`}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] 800px:w-[50%] mt-5 flex flex-col items-center">
            <input
              type="submit"
              value="Cập nhật cửa hàng"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 cursor-pointer`}
              required
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
