import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { DataGrid } from "@material-ui/data-grid";
import { deleteEvent, getAllEventsShop } from "../../redux/actions/event";

const AllEvents = () => {
  const { events, isLoading } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEventsShop(seller._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  //console.log(products);

  const handleDelete = (id) => {
    //console.log(id);
    dispatch(deleteEvent(id));
    window.location.reload();
  };

  const columns = [
    { field: "id", headerName: "Mã sự kiện", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Tên", minWidth: 180, flex: 0.8 },
    { field: "price", headerName: "Giá", minWidth: 100, flex: 0.5 },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 120,
      type: "number",
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Đã bán",
      minWidth: 130,
      type: "number",
      flex: 0.6,
    },
    {
      field: "Preview",
      headerName: "Xem sự kiện",
      minWidth: 130,
      type: "number",
      flex: 0.8,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}?isEvent=true`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      headerName: "Xoá",
      minWidth: 120,
      type: "number",
      flex: 0.6,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20}></AiOutlineDelete>
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  events &&
    events.forEach((event) => {
      rows.push({
        id: event._id,
        name: event.name,
        price: "$" + event.discountPrice,
        stock: event.stock,
        sold: event?.sold_out,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div className="w-full mx-8 bg-white pt-1 mt-10">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          ></DataGrid>
        </div>
      )}
    </>
  );
};

export default AllEvents;
