
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import newlogo from './Assets/newlogo.png'
import "../Styling/footer.css"
import { logout } from '../features/authSlice'
import { useState } from 'react'


function Footer() {

    return (
        
    <div class="footer">
      <div class="heading">
        <h2>FurniCraft<sup>™</sup></h2>
      </div>
      <div class="content">
        <div class="services">
          <h4>Services</h4>
          <p><a href="#">Home Decor</a></p>
          <p><a href="#">Free Installation</a></p>
          <p><a href="#">Delivery Services</a></p>
          <p><a href="#">Web designing</a></p>
        </div>
        <div class="social-media">
          <h4>Social</h4>
          <p>
            <a href="#"
              ><i class="fab fa-linkedin"></i> Linkedin</a
            >
          </p>
          <p>
            <a href="#"
              ><i class="fab fa-twitter"></i> Twitter</a
            >
          </p>
          <p>
            <a href=""
              ><i class="fab fa-github"></i> Github</a
            >
          </p>
          <p>
            <a href=""
              ><i class="fab fa-facebook"></i> Facebook</a
            >
          </p>
          <p>
            <a href=""
              ><i class="fab fa-instagram"></i> Instagram</a
            >
          </p>
        </div>
        <div class="links">
          <h4>Quick links</h4>
          <p><a href="#">Home</a></p>
          <p><a href="#">About</a></p>
          <p><a href="#">Blogs</a></p>
          <p><a href="#">Contact</a></p>
        </div>
        <div class="details">
          <h4 class="address">Address</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur <br />
            adipisicing elit. Cupiditate, qui!
          </p>
          <h4 class="mobile">Mobile</h4>
          <p><a href="#">+91-12225*****</a></p>
          <h4 class="mail">Email</h4>
          <p><a href="#">furnicraft@gmail.com</a></p>
        </div>
      </div>
      <footer>
        <hr />
        © 2022 Copyrights reserved.
        <hr />
      </footer>
    </div>
       
    )
}

export default Footer
