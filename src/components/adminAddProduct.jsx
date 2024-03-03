import { useState } from "react";
import { saveProduct } from "../services/adminAllProducts";
import { useNavigate } from "react-router-dom";
import NavigationBarAdmin from "./NavigationBarAdmin";
import { toast } from 'react-toastify';



function AdminAddProduct(){

    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
        discountedPrice: 0,
        discountPersent: 0,
        quantity: 0,
        brand: '',
        color: '',
        imageUrl:'',
        category: 'Sofa'
   
      }
      );

      const[title,setTitle]=useState('')
      const[price,setPrice]=useState(0)
      const[description,setDescription]=useState('')
      
      const[imageUrl,setImageUrl]=useState('')
      const[quantity,setQuantity]=useState(0)
 
      const[category,setCategory]=useState('')
     
      const handleSubmit = async () => {
        
     
        const response= await saveProduct(title,price,description,imageUrl,quantity,category)
        if(response!=null){
          toast.success("Item Added Successfully");
        }
      };

      const handle=()=>{
        navigate('/admin-homepage')
      }



    return(
      <div>
        <NavigationBarAdmin/>
        <div className="product-form">
      <h2>Add a New Product</h2>
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
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value )}
        />
      </div>


      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

   

  

      <div className="form-group">
        <label>Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>



      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      {/* Add other input fields here */}
      <button onClick={handleSubmit} className="btn btn-success">Submit</button>
      <label style={{width:30}}></label>
      <button onClick={handle} className="btn btn-warning">Back To HomePage</button>
    </div>
    </div>
  );
    


}

export default AdminAddProduct