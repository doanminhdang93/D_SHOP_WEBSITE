import React from 'react'
import styles from '../../../styles/styles';
import { productData } from '../../../static/data';
import ProductCart from '../ProductCard/ProductCard';


const FeaturedProduct = () => {
  return (
    <div>
        <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
                <h1>
                    Sản phẩm nổi bật
                </h1>
            </div>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
                {
                    productData && productData.map((i,index) => 
                        <ProductCart data={i} key={index}></ProductCart>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default FeaturedProduct;