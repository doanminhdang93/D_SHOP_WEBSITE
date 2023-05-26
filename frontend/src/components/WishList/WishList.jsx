import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx';
import styles from '../../styles/styles';
import {AiFillHeart} from 'react-icons/ai';
import {BsCartPlus} from 'react-icons/bs';
import { Link } from 'react-router-dom';

const WishList = ({setOpenWishList}) => {
    const cartData = [
        { 
            name: 'Iphone 14 pro max 512gb silver color',
            description: 'Test',
            price: 999,
        },
        { 
            name: 'Iphone 14 pro max 512gb silver color',
            description: 'Test',
            price: 999,
        },
        { 
            name: 'Iphone 14 pro max 512gb silver color',
            description: 'Test',
            price: 999,
        },
    ]

    return (
        <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
            <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
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
                            3 yêu thích
                        </h5>
                    </div>
                    {/* Single cart item */}
                    <br></br>
                    <div className='w-full border-t'>
                        {
                            cartData && cartData.map((i,index) => (
                                <CartSingle key={index} data={i}></CartSingle>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const CartSingle = ({data}) =>{
    const [value,setValue] = useState(1);
    const totalPrice = data.price * value;
    return(
        <div className="border-b p-4">
            <div className="w-full flex items-center">
                <RxCross1 className='cursor-pointer'></RxCross1>
                <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt='' className='w-[80px] h-[80px] ml-2'/>  
                
                <div className='pl-[5px]'>
                    <h1>{data.name}</h1>
                    <h4 className='font-[600] text-[17px] text-[#d02222] font-Roboto'>${totalPrice}</h4>
                </div>
                <div>
                    <BsCartPlus size={20} className='cursor-pointer' title='Thêm vào giỏ hàng'></BsCartPlus>
                </div>
            </div>
        </div>
    )
}

export default WishList;