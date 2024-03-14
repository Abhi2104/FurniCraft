import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../features/authSlice'
import { loginUser as loginUserApi } from '../services/user'
import { log } from '../utils/utils'
import "../Styling/navbar.css";
import NavigationBar from './navigationBar'



function LoginUser() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // get the navigation object
  const navigate = useNavigate()

  // get dispatcher object
  const dispatch = useDispatch()

  const loginUser = async () => {
    if (email.length == '') {
      toast.error('Please enter email')
    } else if (password.length == '') {
      toast.error('Please enter password')
    } else {
      // call register api
      const response = await loginUserApi(email, password)
        //console.log(response.status);
      // parse the response
      if (response!=null) {
        // parse the response's data and extract the token
        const { jwt, firstName, lastName  } = response['data']

        // store the token for making other apis
        sessionStorage['token'] = jwt
        sessionStorage['firstName'] = firstName
        sessionStorage['lastName'] = lastName
        //sessionStorage['profileImage'] = profileImage
        console.log(response.status)

        // update global store's authSlice with status = true
        dispatch(login())

        toast.success(`Welcome ${firstName} to store application`)

        // go back to login
        navigate('/product-gallery')
      } else {
        toast.error('Invalid user name or password')
      }
    }
  }

  return (
    <div>
      {/* /<h1 style={{ textAlign: 'center', margin: 10 , }}>Welcome To FurniCraft</h1> */}
      <NavigationBar/>
      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>Email</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Password</label>
              <input
                type='password'
                className='form-control'
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <div className='mb-3'>
                 <Link to='/updatepassword'>Forgot Password?</Link>
              </div>
              <div className='user'>
              <button onClick={loginUser} className="btn btn-dark">
                Sign In
              </button>
             
              <Link className='nav-link' to='/register'>
            <div className="btn btn-outline-dark">Sign Up</div>
            </Link>
           </div>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default LoginUser
