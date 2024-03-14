import { useEffect, useState } from "react"
import { deleteCartItemController, getEachCartItem, getUserCart, updateCartItem } from "../services/cart";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import NavigationBarUser from "./navigationBarUser";



function Cart() {
  const navigate=useNavigate();
  const[cartItems,setCartItems]=useState({
    id:'',
    totalPrice:'',
    totalItem:'',

  });

  const[eachItem,setEachItem]=useState([]);

 

  const token=sessionStorage.getItem("token");

 

  useEffect(()=>{
    loadUserCart(token);
    loadeachCartItem(token)
    
  },[])


  const loadUserCart=async (token)=>{
    const response= await getUserCart(token)

    if(response!=null)
    {
      console.log(response.data)
      setCartItems(response.data)
    }
    
  
  }

  const loadeachCartItem=async (token)=>{
       const response= await getEachCartItem(token);
       if(response!=null)
       {
           setEachItem(response.data);
          
       }
  }

  const increase=(quantity,id)=>{
    const x=quantity + 1;
      updateQuantity(id,x,token)
    
  }

  const decrease=(quantity,id)=>{
    const x=quantity - 1;
    updateQuantity(id,x,token)
  }

  const updateQuantity= async (id,x,token)=>{
    const response= await updateCartItem(id,x,token);
    
        
        loadeachCartItem(token)
        loadUserCart(token);
    
    
  }

  const changePage=()=>{
    if(cartItems.totalPrice==0)
    {
      toast.success("Your cart is empty");
    }
    else
    {
      navigate('/order-page')
    }
      
  }
  
  const  goBackPage=()=>{
    navigate('/product-gallery')
}

 
  const deleteCartItem=(CartItemId)=>{
     
    deleteThisItem(CartItemId);

  }
  const deleteThisItem=async (CartItemId)=>{
    const response= await deleteCartItemController(CartItemId)
     loadeachCartItem(token);
     loadUserCart(token);
  }


  return (
    <div className="container table-bordered" style={{backgroundColor:"white",}}>
              <NavigationBarUser/>
            <div>
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            {/* <th>PRODUCT</th> */}
                            <th>ITEM</th>
                            <th>ITEM NAME</th>
                            
                            <th>QUANTITY</th>
                            
                            <th>PRICE</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            eachItem.map((each)=>{
                                return(
                                    <tr>
                                        {/* <td>{each.id}</td> */}
                                    <td>
                                        <img style={{height:100,width:150}} src={each.imageUrl}></img>
                                    </td>
                                    <td>
                                        <h2>{each.title}</h2>
                                    </td>
                                    <td>
                                        <button className="btn btn-secondary" id={each.id} onClick={()=> decrease(each.quantity,each.id)} >-</button>
                                    
                                   
                                    
                                        <input type="text" disabled value={each.quantity} ></input>
                                   
                                   
                                  
                                        <button className="btn btn-secondary" id={each.id} onClick={()=> increase(each.quantity,each.id)}>+</button>
                                        </td>
                                    <td>
                                        {each.price}
                                    </td>
                                    <td>
                                        <button className="btn btn-dark" onClick={()=>deleteCartItem(each.id)}>Delete</button>
                                    </td>
                                </tr>

                                );     
                            })
                            
                        }
                        
                        
                    </tbody>
                </table>
                
            </div>



            <div>
            
            Total:{cartItems.totalPrice}
            </div>
            <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><button className="btn btn-dark btn-block btn-lg ml-2 pay-button" type="button" onClick={()=>changePage()}>Proceed to Pay</button>
            <button className="btn btn-dark btn-block btn-lg ml-2 pay-button" type="button" onClick={()=>goBackPage()}>Add more items</button>
            </div>
            {/* /<div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"></div> */}
        </div>
  )
}

export default Cart