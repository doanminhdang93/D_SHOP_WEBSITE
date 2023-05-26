import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/styles';
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';

const ProductDetails = ({data}) => {
    const [count,setCount] = useState(1);
    const [click,setClick] = useState(false);
    const [select,setSelect] = useState(0);

    const navigate = useNavigate();

    const decreaseCount = () => {
        if(count > 1) {
            setCount(count - 1);
        }
    }

    const increaseCount = () => {
        setCount(count + 1);
    }

    return (
        <div className="bg-white">
            {
                data ? (
                    <div className={`${styles.section} w-[90%] 800px:w-[80%] h-screen`}>
                        <div className="w-full py-5">
                            <div className="block w-full 800px:flex">
                                <div className="w-full 800px:w-[50%]">
                                    <img src={data.image_Url[select].url} alt="" className='w-[80%]'></img>
                                    <div className="w-full flex">
                                        <div className={`${select === 0 ? "border" : "null"} cursor-pointer`}>
                                            <img src={data?.image_Url[0].url} alt=''
                                                className='h-[150px]'
                                                onClick={() => setSelect(0)}
                                            ></img>
                                        </div>
                                        <div className={`${select === 1 ? "border" : "null"} cursor-pointer`}>
                                            <img src={data?.image_Url[1].url} alt=''
                                                className='h-[150px]'
                                                onClick={() => setSelect(1)}
                                            ></img>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full 800px:w-[50%] pt-5">
                                    <h1 className={`${styles.productTitle}`}>
                                        {data.name}
                                    </h1>
                                    <p>{data.description}</p>
                                    <div className="flex pt-3">
                                        <h4 className={`${styles.productDiscountPrice}`}>
                                            {data.discount_price}$
                                        </h4>
                                        <h3 className={`${styles.price}`}>
                                            {data.price ? data.price + '$' : null}
                                        </h3>
                                    </div>

                                    <div className="flex items-center mt-12 justify-between pr-3">
                                        <div>
                                            <button
                                                className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'
                                                onClick={decreaseCount}
                                            > - </button>

                                            <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[10px]">
                                                {count}
                                            </span>

                                            <button
                                                className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'
                                                onClick={increaseCount}
                                            > + </button>
                                        </div>

                                        <div>
                                        {click ? (
                                            <AiFillHeart
                                                size={30}
                                                className='cursor-pointer'
                                                onClick={()=> setClick(!click)}
                                                color={click ? "red" : "black"}
                                                title='Xoá khỏi danh sách yêu thích'
                                            ></AiFillHeart>
                                        ): (
                                            <AiOutlineHeart
                                                size={30}
                                                className='cursor-pointer'
                                                onClick={()=> setClick(!click)}
                                                color={click ? "red" : "black"}
                                                title='Thêm vào danh sách yêu thích'
                                            ></AiOutlineHeart>
                                        )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ):null
            }
        </div>
    )
}

export default ProductDetails;