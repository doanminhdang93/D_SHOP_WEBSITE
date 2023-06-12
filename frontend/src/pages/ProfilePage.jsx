import React, { useState } from 'react'
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import styles from '../styles/styles';
import ProfileSideBar from '../components/Profile/ProfileSideBar';
import ProfileContent from '../components/Profile/ProfileContent';

const ProfilePage = () => {
    const [active,setActive] = useState(1);

    return (
        <div>
            <Header></Header>
            <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
                <div className="w-[50px] 800px:w-[335px] sticky mt-[20%] 800px:mt-0">
                    <ProfileSideBar active = {active} setActive = {setActive}></ProfileSideBar>
                </div>

                <ProfileContent active = {active}></ProfileContent>    

            </div>  
            
            <Footer></Footer>
        </div>
    )
}

export default ProfilePage;