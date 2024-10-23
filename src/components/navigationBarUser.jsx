import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import newlogo from './Assets/newlogo.png'
import "../Styling/navbar.css"
import { logout } from '../features/authSlice'
import { useState } from 'react'


function NavigationBarUser() {
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
                <Link className='nav-link' to='/product-gallery'>
                  Products
                </Link>
              </li>

              <li className='nav-item'>
                <Link className='nav-link' to='/cart'>
                  Cart
                </Link>
              </li>

              <li className='nav-item'>
                <Link className='nav-link' to='/my-orders'>
                  Orders
                </Link>
              </li>

              {/* <li className='nav-item'>
                <Link className='nav-link' to='/profile'>
                  Profile
                </Link>
              </li> */}
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

          <div class="btn btn-outline-secondary" role="button" >
            <button onClick={logoutUser} className='btn' id="logout">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavigationBarUser
