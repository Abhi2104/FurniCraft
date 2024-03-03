import { useEffect, useState } from "react"
import { delProduct, loadProducts } from "../services/adminAllProducts"
import { useNavigate } from "react-router-dom"
import NavigationBarAdmin from "./NavigationBarAdmin"




function AdminHome()
{
    const navigate=useNavigate()
    const[products,setProducts]=useState([])
    var count=1

    useEffect(()=>{
        loadAllProducts()
    },[])
    

   const loadAllProducts=async ()=>{

    const response= await loadProducts()

    setProducts(response.data)
   }

   const deleteThis= async (productId)=>{
     
    const response= await delProduct(productId);

    loadAllProducts()

   }

  

   const updateChanges=(productId)=>{

    navigate('/admin-updateProduct/'+productId)

   }


return(
    <div>
        <NavigationBarAdmin/>
        <table className={'table table-responsive'}>
           
            <tbody>
    {
        products.map((each, index) => {
            return(
                <tr key={each.id}>
                    <td>{count++}</td>
                    <td>
                        <img style={{height:100,width:150}} src={each.imageUrl} alt={`Product ${each.id}`}></img>
                    </td>
                    <td>
                        <h2>{each.title}</h2>
                    </td>
                    <td>
                        <h2>{each.quantity}</h2>
                    </td>
                    <td>
                        <button className="btn btn-warning" onClick={() => updateChanges(each.id)}>UPDATE</button>
                    </td>
                    <td>
                        <button className="btn btn-danger" onClick={() => deleteThis(each.id)}>DELETE</button>
                    </td>
                </tr>
            )
        })
    }
</tbody>


        </table>
       
    </div>
);



    



}

export default AdminHome