import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { paymentDetails } from "../services/payment";
import '../Styling/common.css'



function CustomPage(){

    const[result,setResult]=useState([])
    const navigate=useNavigate()

    const param=useParams()

    const payment_id=param.paymentId;
    const order_id=sessionStorage.getItem("orderId")

   useEffect(()=>{
      loadOrderStatus()
   },[])

   const loadOrderStatus= async ()=>{
        const response= await paymentDetails(payment_id,order_id)

        setResult(response.data)

   }
   const trans=()=>{
    navigate('/product-gallery');
    
   }

    return(
        <div className="payment-container">
      <div className="payment-content">
        <h1>Payment Successful</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="checkmark-icon"
        >
          <path
            d="M416 64L192 320l-96-96"
            fill="none"
            stroke="#ffffff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
          />
        </svg>
        <p>Your payment has been successfully processed.</p>
      </div>

      <div>
        <button className="btn btn-warning" onClick={()=>trans()}>Back To Home Page</button>
      </div>
    </div>
        
    )

}

export default CustomPage