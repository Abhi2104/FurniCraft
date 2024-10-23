import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getProductList, getSearchedProductsList } from '../services/product'
import { constants } from '../utils/constants'
import { addThisItemTocart } from '../services/cart'
import NavigationBarCollection from './NavigationBarCollection'

import '../Styling/common.css'
import { useNavigate } from 'react-router-dom'


function OurCollection() {
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const navigate=useNavigate()
  
    useEffect(() => {
      // get the list of products from server
      loadProducts();
      
    }, [])
  
    useEffect(()=>{
  
      searchProduct()
    },[searchTerm])
  
    const loadProducts = async () => {
      const response = await getProductList()
      //console.log(response['status']);
      if (response.status == 200) {
        setProducts(response.data)
      } else {
        toast.error('Error while calling get /product api')
      }
    }
  
    const addToCart=(productId,quantity)=>{
       const firstQty=1
      addThisitem(productId,firstQty)
  
  
    }
  
    const addThisitem=async(productId,firstQty)=>{
      const response= await addThisItemTocart(productId,firstQty)
  
    }
  
    const filterProducts=(prodName)=>{
  
      console.log(prodName);
  
  
    }
  
    const searchProduct = async ()=>{
  
      const response=await getSearchedProductsList(searchTerm);
  
      setProducts(response.data)
  
    }
  
    const handleSearch = () => {
  
      console.log(searchTerm)
  
      searchProduct()
    
    };
  
  
    const productDisplay=(productId)=>{
  
      navigate('/product-display/'+productId)
  
    }
  
    return (
      <div>
     <NavigationBarCollection/>
  <div className="search-container">
  
  
       
      </div>
        
        <h1 style={{ textAlign: 'center', margin: 10 }}>Shop Our Collection</h1>
  
       
        
    
  
        
        {/*gallery div start*/}
        <div className='row' style={{ marginTop: 50 }}>
        
          {products.map((product) => { 
            return (
              <div className='col-md-3'>
                <div className={'card mine'} onClick={()=>toast.success('Please Login to Shop Our Collection')}>
                
                  <img
                    src={product['imageUrl']}
                    style={{ height: 200 }}
                    alt=''
                  /> 
                  <div className='card-body'>
                    <h5 className='card-title'>{product['title']}</h5>  
                    <div className='card-text'>
                      <div>₹ {product.price}</div>
                      
                      
                      {/* <div>Available Stock: {product.quantity}</div> */}
                      
                      
                      
                      
                      {/* <div>
                      <button type="button" class="btn btn-dark" onClick={()=>addToCart(product.id,product.quantity,product.size)}>Add To Cart</button>
                      </div> */}
                    </div>
                  </div>
                </div>
                <br />
              </div>
            )
          })}
        </div>
        {/*gallery div end*/}
         
  
      </div>
    )
  }
  
  export default OurCollection