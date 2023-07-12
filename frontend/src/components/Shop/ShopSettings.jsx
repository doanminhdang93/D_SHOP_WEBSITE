import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
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
    <div className="w-full mt-2">
      <div className="flex justify-center w-full">
        <div className="relative">
          <img
            src={avatar ? avatar : `${seller.avatar?.url}`}
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
        <form onSubmit={updateHandler}>
          <div className="w-full 800px:flex block pb-3">
            <div className="800px:w-[50%] w-[100%]">
              <label className="block pb-2">Tên cửa hàng</label>
              <input
                type="name"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                placeholder={`${seller.name}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>

            <div className="800px:w-[50%] w-[100%]">
              <label className="block pb-2">Địa chỉ cửa hàng</label>
              <input
                type="name"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                placeholder={`${seller?.address}`}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
                placeholder={`${seller?.phoneNumber}`}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              ></input>
            </div>

            <div className="800px:w-[50%] w-[100%]">
              <label className="block pb-2">Mã vùng</label>
              <input
                type="number"
                placeholder={`${seller?.zipCode}`}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="w-full 800px:flex justify-center items-center block pb-3">
            <div className="800px:w-[50%] w-[100%]">
              <label className="block pb-2">Mô tả cửa hàng</label>
              <textarea
                rows={3}
                placeholder={`${
                  seller?.description
                    ? seller.description
                    : "Nhập mô tả cửa hàng..."
                }`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              ></textarea>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <input
              className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-3 cursor-pointer`}
              required
              value="Cập nhật"
              type="submit"
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
