import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { DataGrid } from "@material-ui/data-grid";

const AllWithdraw = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/withdraw/get-all-withdraws-request`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.withdraws);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "Mã rút tiền", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Tên cửa hàng",
      minWidth: 180,
      flex: 1.1,
    },
    {
      field: "shopId",
      headerName: "Mã cửa hàng",
      minWidth: 180,
      flex: 0.7,
    },
    {
      field: "amount",
      headerName: "Số tiền rút",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "createdAt",
      headerName: "Thời gian",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
  ];

  const row = [];

  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        shopId: item.seller._id,
        name: item.seller.name,
        amount: "$" + item.amount,
        status: item.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });
  return (
    <div className="w-full flex items-center pt-5 justify-center">
      <div className="w-[95%] bg-white">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default AllWithdraw;
