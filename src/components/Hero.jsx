import React from 'react'
import '../Styling/hero.css'
import { Link, useNavigate } from 'react-router-dom'
import banner_img from './Assets/sofa_hero.png.png'
import NavigationBar from './navigationBar'
import Footer from './Footer'
import AboutUs from './Homepage'
import HomePage from './Homepage'


const Hero = () => {
  return (
   <div>
    <NavigationBar/>
    <div className="hero">
      
    
      <div className="hero-right">
        
         <h1>Furniture you will love!</h1>
          <h2>Exclusive range of best quality furniture</h2>
         
          
          <Link className='nav-link' to='/collection'>
          <div className='hero-latest-btn'>Shop now</div>
          
         </Link>
           
       </div>
          
        
         </div>
         <HomePage/>
         <Footer/>

         </div>
  )
}

export default Hero
