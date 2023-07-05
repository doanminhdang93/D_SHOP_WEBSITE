import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx';
import styles from '../../styles/styles';
import {AiFillHeart} from 'react-icons/ai';
import {BsCartPlus} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../../redux/actions/wishlist';
import { backend_url } from '../../server';
import { addToCart } from '../../redux/actions/cart';

const WishList = ({setOpenWishList}) => {
    const {wishlist} = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();

    const removeFromWishlistHandler = (data) =>{
        dispatch(removeFromWishlist(data));
    } 

    const addToCartHandler = (data) => {
        const newData = {...data,qty:1}
        dispatch(addToCart(newData));
        setOpenWishList(false);
    }



    return (
        <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
            <div className="fixed top-0 right-0 overflow-y-scroll h-full w-[80%] 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm">
            {
                wishlist && wishlist.length === 0 ? (
                    <div className="w-full h-screen flex items-center justify-center">
                        <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                            <RxCross1 
                                size={25}
                                className='cursor-pointer'
                                onClick={() => setOpenWishList(false)}
                            ></RxCross1>
                        </div>
                        <h5 className="font-[600] text-lg">
                            Danh sách yêu thích trống!
                        </h5>
                    </div>
                ): (
                    <>
                        <div>
                            <div className="flex w-full justify-end pt-5 pr-5">
                                <RxCross1
                                    size={25}
                                    className='cursor-pointer'
                                    onClick={()=>setOpenWishList(false)}
                                ></RxCross1>
                            </div>
                            {/* Item length */}
                            <div className={`${styles.noramFlex} p-4`}>
                                <AiFillHeart size={25} color='red'></AiFillHeart>
                                <h5 className='pl-2 text-[20px] font-[500]'>
                                    {wishlist && wishlist.length} yêu thích
                                </h5>
                            </div>
                            {/* Single cart item */}
                            <br></br>
                            <div className='w-full border-t'>
                                {
                                    wishlist && wishlist.map((i,index) => (
                                        <CartSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler}></CartSingle>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                )
            }    
            </div>
        </div>
    )
}

const CartSingle = ({data,removeFromWishlistHandler,addToCartHandler}) =>{
    const [value,setValue] = useState(1);
    const totalPrice = data.discountPrice * value;
    //console.log(data);
    return(
        <div className="border-b p-4">
            <div className="w-full flex items-center">
                <RxCross1 className='cursor-pointer' onClick={() => removeFromWishlistHandler(data)}></RxCross1>
                <img src={`${backend_url}${data?.images[0]}`} alt='' className='w-[80px] h-[80px] ml-2'/>  
                
                <div className='pl-[5px]'>
                    <h1>{data.name}</h1>
                    <h4 className='font-[600] text-[17px] text-[#d02222] font-Roboto'>${totalPrice}</h4>
                </div>
                <div>
                    <BsCartPlus size={20} className='cursor-pointer' title='Thêm vào giỏ hàng' onClick={() => addToCartHandler(data)}></BsCartPlus>
                </div>
            </div>
        </div>
    )
}

export default WishList;