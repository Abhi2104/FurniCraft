import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getProductDetails, getReviewsOfProduct } from "../services/productDisplayPage";
import { toast } from 'react-toastify'
import '../Styling/common.css'
import { createReview } from "../services/review";

import { addThisItemTocart } from "../services/cart";
import NavigationBarUser from "./navigationBarUser";

function ProductDisplay()
{

   const params=useParams();
   const productId=params.productId;

   const[productImage,setProductImage]=useState()
   const[productTitle,setProductTitle]=useState('')
   const[productDescription,setProductDescription]=useState('')
   const[productPrice,setProductPrice]=useState('');
//    const[ratingData,setRatings]=useState('')
  // const [productSize,setProductSize]=useState([])
   //const[reviews,setReviews]=useState([])
   const navigate=useNavigate()
   const[text,setText]=useState('')


   useEffect(()=>{

    loadProductDetails()
    //loadReviewDetails()
    // loadRatingDetails()

   },[])

   const loadProductDetails=async ()=>{
    const response= await getProductDetails(productId)

    setProductImage(response.data.imageUrl)
    setProductTitle(response.data.title)
    setProductDescription(response.data.description)
    setProductPrice(response.data.price)
    //setProductSize(response.data.sizes)
    //console.log("product_Size_Boi ",productSize)
   }

//    const loadReviewDetails=async ()=>{
//     const response=await getReviewsOfProduct(productId)
//     console.log(response)
//     setReviews(response.data)

//    }

//    const loadRatingDetails=async ()=>{
//      const response=await getProductRatings(productId)
//      setRatings(response.data.ratings)
//      console.log("ratings= ",response.data)
//    }

//    const addReview=()=>{

//      loadReview()
       
//    }

//    const loadReview=async()=>{
//     const response= await createReview(productId,text)
//     loadReviewDetails()
//     setText('')
//    }

   const addItemTocart=()=>{
       loadMan()

   }

   const loadMan=async ()=>{
    const quantity=1;
    const response= await addThisItemTocart(productId,quantity)
    toast.success('Product Added to Cart Successfully')

   }
   
   const productpage =()=>{
     navigate('/product-gallery')
   }

    

    return(

        <div>
            <NavigationBarUser/>
            <div style={{ display:"flex" }}>
      <div style={{width: '50%', backgroundColor: '' }}  >
           <div className="image-container">
               <img src={productImage} alt="No Imag" height='500' width='500'/>
           </div>
        
      </div>
      <div style={{ width: '50%', backgroundColor: 'light cyan' }}>
        <div  >
            <h2> {productTitle}</h2>
           
        </div>
        <hr></hr>
        <div>
            <h4>{productDescription}</h4>
            
        </div>
        <hr />
        <div >
            <h3>₹{productPrice}</h3>
            
        </div>
        
        {/* <div  className="mine"><h2>RATINGS:</h2>
            {ratingData}/5
         
        </div> */}
        
        {/* <div className="mine">
            { <h2>Sizes:</h2> }
            {
                productSize.map((bhai)=>{
                    return(
                        <div>{bhai.name}</div>
                    )
                })
            }            
        </div> */}
        
        <div >
            {/* <h2>REVIEWS:</h2>
            {
                reviews.map((rev)=>{
                    return(
                        <div>*{rev.review}</div>
                    )
                })
            } */}
            <hr></hr>

      <div>
        
      <button class="button-27" role="button" onClick={()=>addItemTocart()}>Add To Cart</button>

      
        <label style={{width:30}}> </label>
        <button class="button-81" onClick={()=>productpage()}>Go Back </button>
      </div>
        </div>
           <br /><br /><br />
        
      </div>
    </div>

    <br></br>
    <br></br>
       
     


        </div>


    )




}

export default ProductDisplay