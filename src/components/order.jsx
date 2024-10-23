import { useState } from "react";
import { createOrder } from "../services/orders";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import NavigationBarUser from "./navigationBarUser";




function Order()
{
    
  const navigate=useNavigate()
    const[firstName,setFirstName]=useState('')
    const[lastName,setLastName]=useState('')
    const[streetAddress,setStreetAddress]=useState('')
    const[city,setCity]=useState('')
    const[state,setState]=useState('')
    const[zipCode,setZipCode]=useState('')

  
    



    const handleOrderPayment=()=>{

        addOrder();
        
        // setTimeout(()=>{
        //     navigate('/payment-page')
        // },2000)

        

    }

    const addOrder= async ()=>{
        const response= await createOrder(firstName,lastName,streetAddress,city,state,zipCode)
        console.log("Response print-",response.data)
        const orderId=response.data.id

        sessionStorage.setItem("orderId",orderId);

        if (firstName.length == '') {
          toast.error('Please enter Street Address')
        }else if (lastName.length == '') {
          toast.error('Please enter Street Address')
        }  else if (streetAddress.length == '') {
          toast.error('Please enter Street Address')
        } else if (city.length == '') {
          toast.error('Please enter city')
        } else if(state.length ==''){
          toast.error('Please enter State')
        } else if(zipCode.length ==''){
          toast.error('Please enter Zip code')
        }else{
          navigate(`/payment-page/${orderId}`)
        }

    }
    const  goBackPage =()=>{
      navigate('/cart' )
    }

 
    return(
        <div>
            
            <NavigationBarUser/>

            <h1 style={{ textAlign: 'center', margin: 10 }}>Shipping Details</h1>

<div className='row'>
  <div className='col'></div>
  <div className='col'>
    <div className='form'>
      <div className='mb-3'>
        <label htmlFor=''>AddressLine1</label>
        <input
          type='text'
          className='form-control'
          onChange={(e) => {
            setFirstName(e.target.value)
          }}
        />
      </div>

      <div className='mb-3'>
        <label htmlFor=''>AddressLine2</label>
        <input
          type='text'
          className='form-control'
          onChange={(e) => {
            setLastName(e.target.value)
          }}
        />
      </div>

      <div className='mb-3'>
        <label htmlFor=''>StreetAddress</label>
        <input
          type='text'
          className='form-control'
          onChange={(e) => {
            setStreetAddress(e.target.value)
          }}
        />
      </div>

      <div className='mb-3'>
        <label htmlFor=''>City</label>
        <input
          type='text'
          className='form-control'
          onChange={(e) => {
            setCity(e.target.value)
          }}
        />
      </div>

      <div className='mb-3'>
        <label htmlFor=''>State</label>
        <input
          type='text'
          className='form-control'
          onChange={(e) => {
            setState(e.target.value)
          }}
        />
      </div>

      <div className='mb-3'>
        <label htmlFor=''>ZipCode</label>
        <input
          type='text'
          className='form-control'
          onChange={(e) => {
            setZipCode(e.target.value)
          }}
        />
      </div>

      <div className='mb-3'>
        <button onClick={()=>handleOrderPayment()} className='btn btn-dark'>
          Place Order
        </button>
        <button onClick={()=>goBackPage()} className='btn btn-ouline-dark'>
          Go Back
        </button>
      </div>
      
    </div>
  </div>
  <div className='col'></div>
</div>


        </div>
    )

}

export default Order;