import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux/actions/user";
import { AiOutlineDelete } from "react-icons/ai";

const WithdrawMoney = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const [withdrawMethod, setWithdrawMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: null,
    bankAccountNumber: null,
    bankHolderName: "",
    bankAddress: "",
  });

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const withdrawMethod = {
      bankName: bankInfo.bankName,
      bankCountry: bankInfo.bankCountry,
      bankSwiftCode: bankInfo.bankSwiftCode,
      bankAccountNumber: bankInfo.bankAccountNumber,
      bankHolderName: bankInfo.bankHolderName,
      bankAddress: bankInfo.bankAddress,
    };

    setWithdrawMethod(false);

    await axios
      .put(
        `${server}/shop/update-payment-methods`,
        {
          withdrawMethod,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Phương thức rút tiền đã được thêm thành công!");
        dispatch(loadSeller());
        setBankInfo({
          bankName: "",
          bankCountry: "",
          bankSwiftCode: null,
          bankAccountNumber: null,
          bankHolderName: "",
          bankAddress: "",
        });
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const deleteHandler = async () => {
    await axios
      .delete(`${server}/shop/delete-withdraw-method`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Đã xoá phương thức rút tiền thành công!");
        dispatch(loadSeller());
      });
  };

  const error = () => {
    toast.error("Số dư khả dụng không đủ!");
  };

  const withdrawHandler = async () => {
    if (withdrawAmount < 50 || withdrawAmount > availableBalance) {
      toast.error("Bạn không thể rút tiền!");
    } else {
      const amount = withdrawAmount;
      await axios
        .post(
          `${server}/withdraw/create-withdraw-request`,
          { amount },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Yêu cầu rút tiền đã được gửi đi thành công!");
          dispatch(loadSeller());
        });
    }
  };

  const availableBalance = seller?.availableBalance.toFixed(2);

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center flex-col justify-center">
        <h5 className="text-[20px] pb-4">
          Số dư khả dụng: ${availableBalance}
        </h5>
        <div
          className={`${styles.button} text-white !h-[42px] `}
          onClick={() => (availableBalance < 50 ? error() : setOpen(true))}
        >
          Rút tiền
        </div>
      </div>
      {open && (
        <div className="w-full h-screen z-[9999] fixed top-0 left-0 flex items-center justify-center bg-[#0000004e]">
          <div
            className={`w-[95%] 800px:w-[50%] bg-white shadow rounded ${
              withdrawMethod ? "h-[80vh] overflow-y-scroll" : "h-[unset]"
            } min-h-[40vh] p-3`}
          >
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpen(false) || setWithdrawMethod(false)}
              ></RxCross1>
            </div>

            {withdrawMethod ? (
              <div>
                <h3 className="text-[22px] font-Poppins text-center font-[600]">
                  Thêm phương thức rút tiền
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="pt-2">
                    <label>
                      Tên ngân hàng <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      required
                      value={bankInfo.bankName}
                      id=""
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankName: e.target.value })
                      }
                      placeholder="Nhập tên ngân hàng của bạn!"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div className="pt-2">
                    <label>
                      Quốc gia <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      required
                      id=""
                      value={bankInfo.bankCountry}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankCountry: e.target.value,
                        })
                      }
                      placeholder="Nhập quốc gia!"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div className="pt-2">
                    <label>
                      Mã Swift (BIC) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      required
                      id=""
                      value={bankInfo.bankSwiftCode}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankSwiftCode: e.target.value,
                        })
                      }
                      placeholder="Nhập mã swift"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div className="pt-2">
                    <label>
                      Số tài khoản <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      required
                      value={bankInfo.bankAccountNumber}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAccountNumber: e.target.value,
                        })
                      }
                      id=""
                      placeholder="Nhập số tài khoản ngân hàng của bạn!"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div className="pt-2">
                    <label>
                      Tên chủ tài khoản <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      required
                      value={bankInfo.bankHolderName}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankHolderName: e.target.value,
                        })
                      }
                      id=""
                      placeholder="Nhập tên chủ tài khoản!"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div className="pt-2">
                    <label>
                      Địa chỉ ngân hàng của bạn{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      value={bankInfo.bankAddress}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAddress: e.target.value,
                        })
                      }
                      required
                      id=""
                      placeholder="Nhập địa chỉ ngân hàng!"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`${styles.button} mb-3 text-white`}
                  >
                    Thêm
                  </button>
                </form>
              </div>
            ) : (
              <>
                <h3 className="text-[22px] font-Poppins pb-3">
                  Phương thức rút tiền hợp lệ:
                </h3>
                {seller && seller?.withdrawMethod ? (
                  <div>
                    <div className="800px:flex w-full justify-between items-center">
                      <div className="800px:w-[50%]">
                        <h5>
                          Số tài khoản:{" "}
                          {"*".repeat(
                            seller?.withdrawMethod.bankAccountNumber.length - 3
                          ) +
                            seller?.withdrawMethod.bankAccountNumber.slice(-3)}
                        </h5>
                        <h5>
                          Tên ngân hàng: {seller?.withdrawMethod.bankName}
                        </h5>
                      </div>
                      <div className="800px:w-[50%]">
                        <AiOutlineDelete
                          size={25}
                          className="cursor-pointer"
                          onClick={() => deleteHandler()}
                        />
                      </div>
                    </div>
                    <br />
                    <h4>Số dư khả dụng: {availableBalance}$</h4>
                    <br />
                    <div className="800px:flex w-full items-center">
                      <input
                        type="number"
                        placeholder="Số tiền..."
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="800px:w-[100px] w-full border 800px:mr-3 p-1 rounded"
                      />
                      <div
                        className={`${styles.button} !h-[42px] text-white`}
                        onClick={withdrawHandler}
                      >
                        Rút tiền
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[18px] pt-2">
                      Chưa có phương thức rút tiền nào!
                    </p>
                    <div className="w-full flex items-center">
                      <div
                        className={`${styles.button} text-white text-[18px] mt-4`}
                        onClick={() => setWithdrawMethod(true)}
                      >
                        Thêm mới
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawMoney;
