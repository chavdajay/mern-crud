import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess,handleError } from '../utils';

const Login =()=>{
    const[loginInfo, setLoginInfo] = useState({email:'', password:''});
    const navigate = useNavigate();

    const handleChange= (e) =>{
        const {name, value} = e.target;
        setLoginInfo({...loginInfo, [name]:value});
    };

    const handleLogin = async (e) =>{
        e.preventDefault();

        const {email, password} =loginInfo;

        if(!email || !password){
            return handleError('Email and Password are required..');
        }

        try{

            const url = `${process.env.REACT_APP_API_URL}/users`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(loginInfo),
            });
            const result = await response.json();

            const {status, message} = result;
            const {jwtToken}= result.data;

            if(status === "message")
            {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                setTimeout(() => {
                    navigate('/book-list');
                
                }, 1000);
            }else{
                handleError(message);
            }

        }catch(err){
            handleError(err)
        }
    };

    return(
        <div>
            <form onSubmit={handleLogin}>

                <input 
                    type='email'
                    placeholder='enter email'
                    value={loginInfo.email}
                    onChange={handleChange}
                />
                
                 <input 
                    type='password'
                    placeholder='enter password'
                    value={loginInfo.password}
                    onChange={handleChange}
                />
                <button type='submit'>Login</button>
            </form>

            <ToastContainer />
        </div>
    );
};

export default Login;

