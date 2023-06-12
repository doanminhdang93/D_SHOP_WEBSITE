import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import {categoriesData, productData} from "../../static/data";
import {AiOutlineHeart,AiOutlineSearch,AiOutlineShoppingCart} from "react-icons/ai";
import {IoIosArrowDown, IoIosArrowForward} from "react-icons/io";
import {BiMenuAltLeft} from "react-icons/bi";
import {CgProfile} from "react-icons/cg";
import DropDown from './DropDown.jsx';
import NavBar from './NavBar.jsx';
import {useSelector} from "react-redux";
import { backend_url } from "../../server";
import Cart from "../cart/Cart";   
import WishList from "../WishList/WishList";   
import { RxCross1 } from "react-icons/rx";
import { Navigate } from "react-router-dom";

const Header = ({activeHeading}) => {
  const {isAuthenticated,user} = useSelector((state) => state.user);
  //console.log(user);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active,setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);

  const [open,setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProducts =
      productData &&
      productData.filter((product) => 
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if(window.scrollY > 100){
        setActive(true);
    }else{
        setActive(false);
    } 
  })

  return (
    <>
        <div className={`${styles.section}`}>
            <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
                <div>
                    <Link to="/">
                        <img
                        src={require("../../static/images/Logo.png")}
                        alt="logo"
                        style={{ width: "200px"}}
                        />
                    </Link>
                </div>
                {/* Search box */}
                <div className="w-[50%] relative">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                    ></input>
                    <AiOutlineSearch size={30} className="absolute right-2 top-1.5 cursor-pointer"></AiOutlineSearch>
                    {
                        searchData && searchData.length !== 0 ? (
                            <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                                {searchData && searchData.map((i) =>{
                                    const d = i.name;
                                    const Product_name = d.replace(/\s+/g, "-");
                                    return (
                                        <Link to={`/product/${Product_name}`}>
                                            <div className="w-full flex item-start-py-3">
                                                <img src={i.image_Url[0].url} alt=""
                                                    className="w-[40px] h-[40px] mr-[10px]"
                                                />
                                                <h1>{i.name}</h1>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        ) : null
                    } 
                </div>
                <div className={`${styles.button}`}>
                    <Link to="/shop-create">
                        <h1 className="text-[#fff] flex items-center ">
                            Kênh người bán <IoIosArrowForward className="ml-1"></IoIosArrowForward>
                        </h1>
                    </Link>
                </div>
            </div>   
        </div>

        <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}>
            <div className={`${styles.section} relative ${styles.noramFlex} justify-between`}>
                {/* Categories */}
                <div onClick={()=> setDropDown(!dropDown)}>
                    <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
                        <BiMenuAltLeft size={30} className="absolute top-3 left-2 cursor-pointer"></BiMenuAltLeft>
                        <button 
                            className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
                        >Bộ lọc tìm kiếm</button>
                        <IoIosArrowDown size={20} className="absolute right-2 top-4 cursor-pointer"
                            onClick={()=> setDropDown(!dropDown)}
                        ></IoIosArrowDown>
                        {
                            dropDown ? (
                                <DropDown categoriesData = {categoriesData}
                                    setDropDown = {setDropDown}
                                ></DropDown>
                            ) : null
                        }
                    </div>
                </div>

                {/* navitems */}
                <div className={`${styles.noramFlex}`}>
                    <NavBar active = {activeHeading}></NavBar>
                </div>

                <div className='flex'>
                    <div className={`${styles.noramFlex}`}>
                        <div className="relative cursor-pointer mr-[15px]"
                            onClick={() => setOpenWishlist(true)}
                        >
                            <AiOutlineHeart 
                                size={30}
                                color='rgb(255 255 255 / 83%)'
                            ></AiOutlineHeart>
                            <span className="absolute right-0 top-0 rounded-full bg-[#3BC177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-right text-center">
                                0
                            </span>
                        </div>
                    </div>

                    <div className={`${styles.noramFlex}`}>
                        <div className="relative cursor-pointer mr-[15px]"
                            onClick={() => setOpenCart(true)}
                        >
                            <AiOutlineShoppingCart 
                                size={30}
                                color='rgb(255 255 255 / 83%)'
                            ></AiOutlineShoppingCart>
                            <span className="absolute right-0 top-0 rounded-full bg-[#3BC177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-right text-center">
                                1
                            </span>
                        </div>
                    </div>

                    <div className={`${styles.noramFlex}`}>
                        <div className="relative cursor-pointer mr-[15px]">
                            {
                                isAuthenticated ? (
                                    <Link to = '/profile'>
                                        <img src = {`${backend_url}${user.avatar}`} className="w-[35px] h-[35px] rounded-full" alt = ""/>
                                    </Link>
                                ) : (
                                    <Link to = '/login'>
                                        <CgProfile 
                                            size={30}
                                            color='rgb(255 255 255 / 83%)'
                                        ></CgProfile>
                                    </Link>
                                )
                            }
                        </div>
                    </div>

                    {/* Cart popup */}
                    {
                        openCart ? (
                            <Cart setOpenCart={setOpenCart}></Cart>
                        ) : null
                    }
                    {/* Wishlist popup */}
                    {
                        openWishlist ? (
                            <WishList setOpenWishList={setOpenWishlist}></WishList>
                        ) : null
                    }
                </div>
            </div>
        </div> 

        {/* Mobile header */}
        <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} w-full h-[60px] bg-[#f6f6f5] z-50 top-0 left-0 shadow-sm 800px:hidden`}>
            <div className="w-full flex items-center justify-between">
                <div>
                    <BiMenuAltLeft
                        size={40}
                        className="ml-4 cursor-pointer"
                        onClick={() => setOpen(true)}
                    />
                </div>
                <div>
                    <Link to="/">
                        <img
                            src={require("../../static/images/Logo.png")}
                            alt="logo"
                            className="mt-1 cursor-pointer w-[120px]"
                        />
                    </Link>
                </div>
                <div>
                    <div className="relative mr-[20px]">
                        <AiOutlineShoppingCart 
                            size={30}
                            className="cursor-pointer"
                        ></AiOutlineShoppingCart>
                        <span className="absolute right-0 top-0 rounded-full bg-[#3BC177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-right text-center">
                            1
                        </span>
                    </div>
                </div>
            </div>

            {/* Header Sidebar */}
            {
                open && (
                    <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
                        <div className="fixed w-[60%] bg-white h-screen top-0 left-0 z-10 overflow-y-scroll">
                            <div className="w-full flex justify-between pr-3">
                                <div>
                                    <div className="relative mr-[15px]">
                                        <AiOutlineHeart
                                            size={30}
                                            className="mt-5 ml-3 cursor-pointer"
                                        ></AiOutlineHeart>
                                        <span className="absolute right-0 top-0 rounded-full bg-[#3BC177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-right text-center">
                                            1
                                        </span>
                                    </div>
                                </div>

                                <RxCross1
                                    size={30}
                                    className="ml-4 mt-5 cursor-pointer"
                                    onClick={() => setOpen(false)}
                                ></RxCross1>
                            </div>

                            <div className="relative my-8 w-[92%] m-auto h-[40px]">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm sản phẩm..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                                ></input>
                                <AiOutlineSearch size={30} className="absolute right-2 top-1.5 cursor-pointer"></AiOutlineSearch>
                                {
                                    searchData && searchData.length !== 0 ? (
                                        <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                                            {searchData && searchData.map((i) =>{
                                                const d = i.name;
                                                const Product_name = d.replace(/\s+/g, "-");
                                                return (
                                                    <Link to={`/product/${Product_name}`}>
                                                        <div className="w-full flex item-start-py-3">
                                                            <img src={i.image_Url[0].url} alt=""
                                                                className="w-[40px] h-[40px] mr-[10px]"
                                                            />
                                                            <h1>{i.name}</h1>
                                                        </div>
                                                    </Link>
                                                )
                                                
                                            })}
                                        </div>
                                    ) : null
                                }
                            </div>

                            <NavBar active={activeHeading}></NavBar>
                            <div className={`${styles.button} ml-4`}>
                                <Link to="/shop-create">
                                    <h1 className="text-[#fff] flex items-center ">
                                        Kênh người bán <IoIosArrowForward className="ml-1"></IoIosArrowForward>
                                    </h1>
                                </Link>
                            </div>
                            <br />
                            <br />
                            <br />
                            <div className="flex w-full justify-center mb-9">
                                {
                                    isAuthenticated ? (
                                        <>
                                            <div>
                                                <Link to='/profile'>
                                                    <img src={`${backend_url}${user.avatar}`} alt="" className="w-[60px] h-[60px] rounded-full border-[3px] border-[#2ea59b]" />
                                                </Link>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Link to='/login' className="text-[18px] pr-[10px] text-[#000000b7]">Đăng nhập /</Link>
                                            <Link to='/sign-up' className="text-[18px] text-[#000000b7]">Đăng ký</Link>
                                        </>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    </>
  );
};

export default Header;
