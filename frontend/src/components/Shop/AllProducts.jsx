import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { DataGrid } from "@material-ui/data-grid";
import { toast } from "react-toastify";

const AllProducts = () => {
  const { error, products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    if (error) {
      console.log("error", error);
      toast.error(error);
      return;
    }
    toast.success("Đã xoá sản phẩm thành công");
    window.location.reload();
  };

  const columns = [
    { field: "id", headerName: "Mã sản phẩm", minWidth: 160, flex: 0.8 },
    { field: "name", headerName: "Tên sản phẩm", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Giá", minWidth: 100, flex: 0.6 },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 130,
      type: "number",
      flex: 0.6,
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
      headerName: "Xem trước",
      minWidth: 100,
      type: "number",
      flex: 0.8,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
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
      flex: 0.8,
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

  products &&
    products.forEach((product) => {
      rows.push({
        id: product._id,
        name: product.name,
        price: "$" + product.discountPrice,
        stock: product.stock,
        sold: product.sold_out,
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

export default AllProducts;
