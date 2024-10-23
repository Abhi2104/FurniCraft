import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../features/authSlice'
import { loginUser as loginUserApi } from '../services/user'
import { log } from '../utils/utils'
import { updateUser } from '../services/user'
import NavigationBar from './navigationBar'

function UpdatePassword() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  

const update=async ()=>{
    if (email.length == '') {
        toast.error('Please enter email')
      } else if (password.length == '') {
        toast.error('Please enter password')
      } else {
    const response= await updateUser(email,password)
    if (response!=null) {
        // parse the response's data and extract the token
        const { jwt } = response['data']

        // store the token for making other apis
        sessionStorage['token'] = jwt
        // sessionStorage['firstName'] = firstName
        // sessionStorage['lastName'] = lastName
        toast.success('Password Changed Successfully')

        // go back to login
        // navigate('/product-gallery')
      } else {
        toast.error('Invalid email')
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
              <label htmlFor=''>Enter your Existing Email</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>New Password</label>
              <input
                type='password'
                className='form-control'
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <div className='mb-3'>
              {/* <div className='mb-3'>
                Don't have an account? <Link to='/register'>Register here</Link>
              </div> */}
              <button onClick={update} className='btn btn-success'>
               Reset Password
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default UpdatePassword
