import React, { useEffect } from 'react'
import ShopLogin from '../components/Shop/ShopLogin.jsx';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShopLoginPage = () => {
  const {isSeller,isLoading} = useSelector((state) => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    if(isSeller === true) {
      navigate('/dashboard');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading,isSeller]);
  return (
    <div>
        <ShopLogin></ShopLogin>
    </div>
  )
}

export default ShopLoginPage;
