import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { categoriesData } from '../../static/data';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { createProduct } from '../../redux/actions/product';
import {toast} from 'react-toastify';
import { MdToday } from 'react-icons/md';

const CreateEvent = () => {
    const {seller} = useSelector((state) => state.seller);
    const {success,error} = useSelector((state) => state.products);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [images,setImages] = useState([]);
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState("");
    const [tags,setTags] = useState("");
    const [originalPrice,setOriginalPrice] = useState();
    const [discountPrice,setDiscountPrice] = useState();
    const [stock,setStock] = useState();
    const [startDate,setStartDate] = useState(null);
    const [endDate,setEndDate] = useState(null);

    const handleStartDateChange = (e) => {
        const startDate = new Date(e.target.value);
        const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
        setStartDate(startDate);
        setEndDate(null);
        document.getElementById("end-date").min = minEndDate.toISOString().slice(0,10);
    };

    const handleEndDateChange = (e) => {
        const endDate = new Date(e.target.value);
        setEndDate(endDate);
    };

    const today = new Date().toISOString().slice(0,10);

    const minEndDate = startDate ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0,10) : today;

    useEffect(() => {
        if(error){
            toast.error(error);
        }
        if(success){
            toast.success("Sản phẩm đã được tạo thành công!");
            navigate("/dashboard");
            window.location.reload();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch,error,success]);

    const handleImageChange = (e) => {
        e.preventDefault();
        let files = Array.from(e.target.files);
        setImages((preImages) => [...preImages,...files]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newForm = new FormData();
        images.forEach((image)=>{
            newForm.append("images",image);
        })
        newForm.append("name",name);
        newForm.append("description",description);
        newForm.append("category",category);
        newForm.append("tags",tags);
        newForm.append("originalPrice",originalPrice);
        newForm.append("discountPrice",discountPrice);
        newForm.append("stock",stock);
        newForm.append("shopId",seller._id);

        dispatch(createProduct(newForm));
    }

    return (
        <div className='w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] px-3 overflow-y-scroll'>
            <h5 className='text-[30px] font-Poppins text-center'>
                Tạo sự kiện
            </h5>
            {/* create event form */}
            <form onSubmit={handleSubmit}>
                <br />
                <div>
                    <label className="pb-2">
                        Tên <span className='text-red-500'>*</span>
                    </label>
                    <input 
                        type="text" 
                        name="name" 
                        required
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        placeholder='Nhập tên sản phẩm có trong sự kiện...'
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Mô tả <span className='text-red-500'>*</span>
                    </label>
                    <textarea
                        cols="30"
                        required
                        rows="8"
                        type="text"
                        name="description"
                        value={description}
                        className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Nhập mô tả sản phẩm..."
                    ></textarea>
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Loại sản phẩm <span className='text-red-500'>*</span>
                    </label>
                    <select className='w-full mt-2 border h-[35px] rounded-[5px]'
                        value={category}
                        onChange={(e)=>setCategory(e.target.value)}
                    >
                        <option value="Chọn loại sản phẩm">Chọn loại sản phẩm</option>
                        {
                            categoriesData && categoriesData.map((i) =>(
                                <option
                                    value={i.title}
                                    key={i.title}
                                >{i.title}</option>
                            ))
                        }
                    </select>
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Nhãn
                    </label>
                    <input 
                        type="text" 
                        name="tags" 
                        value={tags} 
                        onChange={(e) => setTags(e.target.value)}
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        placeholder='Nhập nhãn sản phẩm...'
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Giá gốc
                    </label>
                    <input 
                        type="number" 
                        name="price" 
                        value={originalPrice} 
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        placeholder='Nhập giá gốc...'
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Giá khuyến mãi <span className='text-red-500'>*</span>
                    </label>
                    <input 
                        type="number" 
                        name="price" 
                        required
                        value={discountPrice} 
                        onChange={(e) => setDiscountPrice(e.target.value)}
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        placeholder='Nhập giá khuyến mãi...'
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Số lượng sản phẩm còn trong kho <span className='text-red-500'>*</span>
                    </label>
                    <input 
                        type="number" 
                        name="stock" 
                        value={stock} 
                        onChange={(e) => setStock(e.target.value)}
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        placeholder='Nhập số lượng...'
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Ngày bắt đầu sự kiện <span className='text-red-500'>*</span>
                    </label>
                    <input 
                        type="date" 
                        name="start-date" 
                        required
                        id="start-date"
                        value={startDate ? startDate.toISOString().slice(0,10) : ""} 
                        onChange={handleStartDateChange}
                        min={today}
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        placeholder='Nhập ngày bắt đầu sự kiện...'
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Ngày kết thúc sự kiện <span className='text-red-500'>*</span>
                    </label>
                    <input 
                        type="date" 
                        name="end-date" 
                        required
                        id="end-date"
                        value={endDate ? endDate.toISOString().slice(0,10) : ""} 
                        onChange={handleEndDateChange}
                        min={minEndDate}
                        className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm'
                        placeholder='Nhập ngày bắt đầu sự kiện...'
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Tải ảnh sản phẩm <span className='text-red-500'>*</span>
                    </label>
                    <input type="file" id="upload" required className="hidden" multiple onChange={handleImageChange} />
                    <div className="w-full flex items-center flex-wrap">
                        <label htmlFor="upload">
                            <AiOutlinePlusCircle
                                size={30}
                                className='mt-3 cursor-pointer'
                                color='#555'
                            ></AiOutlinePlusCircle>
                        </label> 
                        {
                            images && images.map((i) =>(
                                <img src={URL.createObjectURL(i)} key={i} alt="" className="h-[120px] w-[120px] object-cover m-2"></img>
                            ))
                        }
                    </div>
                    <br />
                    <div>
                        <input type="submit" value="Tạo sản phẩm"
                            className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm cursor-pointer'
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateEvent;