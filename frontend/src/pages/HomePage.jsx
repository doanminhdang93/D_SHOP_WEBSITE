import React, { useEffect } from 'react'
import Header from '../components/Layout/Header';
import Hero from '../components/Route/Hero/Hero.jsx';
import Categories from '../components/Route/Categories/Categories.jsx';
import BestDeals from '../components/Route/BestDeals/BestDeals.jsx';
import FeaturedProduct from '../components/Route/FeaturedProduct/FeaturedProduct.jsx';
import Events from '../components/Events/Events.jsx';
import Sponsored from '../components/Route/Sponsored.jsx';
import Footer from '../components/Layout/Footer.jsx';

const HomePage = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[]);

  return (
    <div> 
        <Header activeHeading={1}></Header>
        <Hero></Hero>
        <Categories></Categories>
        <BestDeals></BestDeals>
        <Events></Events>
        <FeaturedProduct></FeaturedProduct>
        <Sponsored></Sponsored>
        <Footer></Footer>
    </div>
  )
}

export default HomePage;