import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import newlogo from './Assets/newlogo.png'
import "../Styling/navbar.css"
import { logout } from '../features/authSlice'
import { useState } from 'react'


function NavigationBarCollection() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isauthenticated=useSelector(state => state.auth.status)

  // logout the user
  const logoutUser = () => {
    // clear the session storage changes
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('mobile')
    sessionStorage.removeItem('profileImage')
    sessionStorage.removeItem('firstName')
    sessionStorage.removeItem('lastName')

    // hide the navigation bar
    dispatch(logout())

    // redirect to login page
    navigate('/')
  }

  // const adminLogin=()=>{
  //   navigate('/adminLogin')
  // }

  // const validate=()=>{
  //    console.log(isauthenticated)
  //   if(sessionStorage.getItem('token')!='')
  //   navigate('/profile')

  // }


  return (
    <div>

      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='container-fluid'>
        <div className="nav-logo">
            
            <Link className='nav-link' to='/'>
            <img src={newlogo} alt=""/> 
           
            </Link>
            </div>
          
         
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
                <Link className='nav-link' to='/'>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/collection'>
                  Our Collection
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/aboutus'>
                  About Us
                </Link>
              </li>

              

             
            </ul>
          </div>

          {/* <div className='d-flex'>
            <button onClick={adminLogin()} className='btn'>
              ADMIN
            </button>
          </div> */}
          <div className='d-flex'>
            {sessionStorage.getItem('firstName')}
            <label style={{width:10}}></label>
          </div>
          <div className='d-flex'>
            <button className='btn btn-outline-success'>
            <Link className='nav-link' to='/login'>
                  LOGIN
                </Link>

            </button>
          
          </div>


          <div className='d-flex'>
            <button className='btn btn-success'>
            <Link className='nav-link' to='/admin-login'>
                  ADMIN
                </Link>

            </button>
          
          </div>

         
        </div>
      </nav>
    </div>
  )
}

export default NavigationBarCollection
