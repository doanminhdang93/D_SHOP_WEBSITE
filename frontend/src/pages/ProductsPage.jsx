import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header';
import styles from '../styles/styles';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/Route/ProductCard/ProductCard';
import Footer from '../components/Layout/Footer';
import { useSelector } from 'react-redux';
 
const ProductsPage = () => {
    const [searchParams]= useSearchParams();
    const categoryData = searchParams.get("category");
    //console.log(categoryData);
    const {allProducts} = useSelector((state) => state.products);
    const [data,setData] = useState([]);

    useEffect(()=>{
        window.scrollTo(0,0);
        if(categoryData === null){
            const allProductsData = allProducts ? [...allProducts] : [];
            const d = allProductsData && allProductsData.sort((a,b) => a.sold_out - b.sold_out);
            setData(d);
        }
        else{
            const d = allProducts && allProducts.filter((i) => i.category === categoryData);
            setData(d);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[allProducts]);
    return (
        <div>
            <Header activeHeading={3}></Header>
            <br/>
            <br/>
            <div className={`${styles.section}`}>
                <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12'>
                    {
                        data && data.map((i,index) => <ProductCard data={i} key={index}></ProductCard>)
                    } 
                </div>
                {
                    data && data.length === 0 ? (
                        <h1 className='text-center w-full pb-[100px] text-[25px]'>
                            Không tìm thấy sản phẩm nào!
                        </h1>
                    ) : null
                }
            </div>
            <Footer></Footer>
        </div>
    )
}

export default ProductsPage;