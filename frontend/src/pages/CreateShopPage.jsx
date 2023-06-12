import React from "react";
import CreateShop from "../components/Shop/CreateShop.jsx";
import { useEffect } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateShopPage = () => {
  const { isSeller, seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/shop/${seller._id}`);
    }
  }, []);
  return (
    <div>
      <CreateShop></CreateShop>
    </div>
  );
};

export default CreateShopPage;
