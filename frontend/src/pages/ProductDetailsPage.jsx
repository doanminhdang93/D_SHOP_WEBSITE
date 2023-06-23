import React, {useEffect, useState} from 'react'
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ProductDetails from '../components/Products/ProductDetails';
import { useParams } from 'react-router-dom';
import SuggestedProduct from '../components/Products/SuggestedProduct';
import { useSelector } from 'react-redux';

const ProductDetailsPage = () => {
    const {allProducts} = useSelector((state) => state.products);

    const {id} = useParams();
    const [data,setData] = useState(null); 

    useEffect(()=>{
        const data = allProducts?.find((i) => i._id === id);
        setData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data,allProducts])

    return (
        <div>
            <Header></Header>
            <ProductDetails data={data}></ProductDetails>
            {
                data && (
                    <SuggestedProduct data={data}></SuggestedProduct>
                )
            }
            <Footer></Footer>
        </div>
    )
}

export default ProductDetailsPage;