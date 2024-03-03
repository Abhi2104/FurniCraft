import { useState } from "react";
import '../Styling/common.css'
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify'
import { loginUser } from "../services/user";
import { useNavigate } from "react-router-dom";
import { login } from "../features/authSlice";

import NavigationBarCollection from "./NavigationBarCollection";


function AdminLogin()
{


    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Your login logic here
    if (email.length == '') {
        toast.error('Please enter email')
      } else if (password.length == '') {
        toast.error('Please enter password')
      } else {
        // call register api
        const response = await loginUser(email,password)
         
        // parse the response
        if (response!=null) {
          // parse the response's data and extract the token
          const { jwt, firstName, lastName  } = response['data']
  
          // store the token for making other apis
          sessionStorage['token'] = jwt
          sessionStorage['firstName'] = firstName
          sessionStorage['lastName'] = lastName
          
          // update global store's authSlice with status = true
          dispatch(login())
  
          toast.success(`Welcome ${firstName} to store application`)
  
          // go back to login
          navigate('/admin-homepage')
        } else {
          toast.error('Invalid user name or password')
        }
      }


  };

  return (
    <div>

   <NavigationBarCollection/>
    <div className="login-container">
      <div className="login-form">
        <h2>Admin Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
    </div>
  );





}


export default AdminLogin