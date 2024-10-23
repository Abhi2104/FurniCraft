import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser as registerUserApi } from '../services/user'
import NavigationBar from './navigationBar'
function RegisterUser() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role,setRole] = useState('USER')

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phonePattern = /^[0-9]{10}$/;
  // get the navigation object
  const navigate = useNavigate()

  const registerUser = async () => {
    if (firstName.trim() === '') {
      toast.error('Please enter first name')
    } else if (lastName.trim()=== '') {
      toast.error('Please enter last name')
    } else if (!emailPattern.test(email)) {
      toast.error('Please enter valid email')
    } else if (!phonePattern.test(mobile)) {
      toast.error('Please enter valid mobile number')
    } else if (!passwordPattern.test(password)) {
      toast.error('Password must contain at least 8 characters, one uppercase letter, one digit, and one special character.')
    }  else if (password !== confirmPassword) {
      toast.error('Password does not match')
    } else {
      // call register api
      const response = await registerUserApi(
        firstName,
        lastName,
        email,
        password,
        mobile,
        role
      )

      // parse the response
      if (response != null) {
        toast.success('You are successfully registered...')

        // go back to login
        navigate('/')
      } else {
        toast.error('Error while registering a new user, please try again')
      }
    }
  }

  return (
    <div>
      <NavigationBar/>
      <h1 style={{ textAlign: 'center', margin: 10 }}>Register User</h1>

      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>First Name</label>
              <input
                type='text'
                value={firstName}
                className='form-control'
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Last Name</label>
              <input
                type='text'
                value={lastName}
                className='form-control'
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Email</label>
              <input
                type='text'
                value={email}
                className='form-control'
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Mobile Number</label>
              <input
                type='tel'
                value={mobile}
                className='form-control'
                onChange={(e) => {
                  setMobile(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Password(Must contain 8 characters,1 special,1 uppercase and 1 lowercase letter)</label>
              <input
                type='password'
                value={password}
                className='form-control'
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Confirm Password</label>
              <input
                type='password'
                value={confirmPassword}
                className='form-control'
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>ROLE</label>
              <input
                type='text'
                value={role}
                className='form-control'
                onChange={(e) => {
                  setRole(e.target.value)
                }}
              disabled={true}
              />
            </div>

            <div className='mb-3'>
              <div className='mb-3'>
                Already got an account? <Link to='/'>Login here</Link>
              </div>
              <button onClick={registerUser} className='btn btn-success'>
                Register
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
      </div>
    </div>
  )
}

export default RegisterUser
