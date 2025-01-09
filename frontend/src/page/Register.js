import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { handleSuccess, handleError } from "../utils";
import { ToastContainer } from "react-toastify";

const Register = () =>{
    const[signupInfo, setSignupInfo] = useState({email:'', password:'', confirmPassword:''});
    const navigate = useNavigate();

    const handleChange  = (e) =>{
        const {name, value} = e.target;
        setSignupInfo({...signupInfo, [name] : value});

    };

    const handleSignup = async (e) =>{
        e.preventDefault();

        const{email, password, confirmPassword} = signupInfo;
         // Validation email, password, and confirmpassword required
         if (!email || !password || !confirmPassword) {
            return handleError('All fields are required');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//email validation
        if (!emailRegex.test(email)) {
            return handleError('Please enter a valid email address');
        }
        if (password.length < 6) {
            return handleError('Password must be at least 6 characters long');
        }
        if (password !== confirmPassword) {
            return handleError('Passwords do not match');
        }


        try{
            const url = `${process.env.REACT_APP_API_URL}/users`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body:JSON.stringify(email, password)

            });
            const results = response.json();

            const {status, message, error} = results;

            if(status === "success"){
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/book-list');
                }, 1000);
            }else{
                handleError(error?.details[0]?.message || message);
            }

        }catch(err){
            handleError(err);
        }
    }
    return(
        <div>
            <form onSubmit={handleSignup}>

                <input  
                    type="email"
                    placeholder="Email"
                    value={signupInfo.email}
                    onChange={handleChange}
                />
                <input  
                    type="password"
                    placeholder="password"
                    value={signupInfo.password}
                    onChange={handleChange}
                />
                <input  
                    type="password"
                    placeholder="Re-enter your password"
                    value={signupInfo.confirmPassword}
                    onChange={handleChange}
                />
              <button type="submit">Sign UP</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Register;