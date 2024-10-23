import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import newlogo from './Assets/newlogo.png'
import "../Styling/navbar.css"
import { logout } from '../features/authSlice'
import { useState } from 'react'


function NavigationBarAdmin() {
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
  const addNewProduct=()=>{

    navigate('/admin-addProduct')
   }
   
   const allOrders=()=>{

    navigate('/admin-order-status')
    
   }



  return (
    <div>

      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='container-fluid'>
        <div className="nav-logo">
            
            <Link className='nav-link' to='/'>
            <img src={newlogo} alt=""/> 
           
            </Link>
            </div>
           
            <button className="btn btn-success" onClick={()=>addNewProduct()}>Add New Item</button>
       
        <button className="btn btn-info" onClick={()=>allOrders()}>Order Status</button>
         
        

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

export default NavigationBarAdmin
