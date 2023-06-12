import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { server } from '../server';

const SellerActivationPage = () => {
    const {activation_token} = useParams();
    const [error,setError] = useState(false);

    useEffect(() => {
        if(activation_token){
            const activationEmail = async() => {
                try{
                    const res = await axios.post(`${server}/shop/activation`,{
                        activation_token,
                    });
                    console.log(res.data.message);
                }catch(err){
                    console.log(err.response.data.message);
                    setError(true);
                }
            }
            activationEmail();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '30px'
        }}>
        {
            error ? (
                <p>Mã token của bạn đã hết hạn!</p>
            ):(
                <p>Tài khoản của bạn đã được tạo thành công</p>
            )
        }
        </div>
    )
}

export default SellerActivationPage;