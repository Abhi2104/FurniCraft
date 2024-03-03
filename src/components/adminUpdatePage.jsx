import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getProductDetails } from "../services/productDisplayPage"
import { UpdateItem } from "../services/adminAllProducts"
import NavigationBarAdmin from "./NavigationBarAdmin"



function AdminUpdatePage(){


    const params=useParams()
    const productId=params.productId
    const navigate=useNavigate()

    const[title,setTitle]=useState('')
    const[description,setDescription]=useState('')
    const[quantity,setQuantity]=useState('')


    useEffect(()=>{
        loadSpecificProduct()
    },[])

    const loadSpecificProduct=async()=>{
        const response=await getProductDetails(productId)
        setTitle(response.data.title)
        setDescription(response.data.description)
        setQuantity(response.data.quantity)

    }

    const update=async ()=>{
        const response= await UpdateItem(productId,title,description,quantity)

    }

    const move=()=>{
        navigate('/admin-homepage')
    }


    return(
      <div>
      <NavigationBarAdmin/>
        <div className="product-form">
      <h2>Update Product: {title}</h2>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </div>
   
       <div className="form-group">
        <label>Stock</label>
        <input
          type="text"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        </div>
      {/* Add other input fields here */}
      <button className="btn btn-success" onClick={()=>update()}>Save Changes</button>
      <label style={{width:30}}></label>
      <button  className="btn btn-warning" onClick={()=>move()}>Back To HomePage</button>
    </div>
    </div>
    )







}

export default AdminUpdatePage