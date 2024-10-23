import axios from "axios";
import { createUrl, log } from "../utils/utils";




export async function loadProducts(){

    const url=createUrl('/api/admin/products/all')
    const token=sessionStorage.getItem('token')

    try{

        const response= await axios.get(url,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        log(response.status)
        log(response.data)
        return response

    }catch(ex){
        log(ex)
        return null
    }
}

export async function delProduct(productId){
    const url=createUrl('/api/admin/products/'+productId+'/delete')
    const token=sessionStorage.getItem('token')

    try{
        const response=await axios.delete(url,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        log(response.status)
        log(response.data)
        return response

    }catch(ex){
        log(ex)
        return null
    }

}


export async function saveProduct(title,price,description,imageUrl,quantity,category){

    const url=createUrl('/api/admin/products/');
    const token=sessionStorage.getItem('token')
    const body={
        title,
        price,
        description,
        imageUrl,
        quantity,
        category
    }

    try{
        const response= await axios.post(url,body,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        
        log(response)
        return response

    }catch(ex){
        log(ex)
        return null

    }

}

export async function UpdateItem(productId,title,description,quantity){

    const url=createUrl('/api/admin/products/'+productId+'/update')
    const token=sessionStorage.getItem('token')
    const body={
        title,
        description,
        quantity
    }

    try{
        const response= await axios.put(url,body,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        log(response)
        return response

    }catch(ex){
        log(ex)
        return null
    }

}


export async function getOrderStatus()
{
     const url=createUrl('/api/admin/orders/')
     const token=sessionStorage.getItem('token')

     try{
        const response= await axios.get(url,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        log(response)
        return response

     }catch(ex){
        log(ex)
        return null
     }

}

export async function status_Confirmed(orderId)
{
    const url=createUrl('/api/admin/orders/'+orderId+'/confirmed')
    const token=sessionStorage.getItem('token')

     try{
        const response= await axios.put(url,null,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        log(response)
        return response

     }catch(ex){
        log(ex)
        return null
     }



}

export async function status_Shipped(orderId)
{
    const url=createUrl('/api/admin/orders/'+orderId+'/ship')
    const token=sessionStorage.getItem('token')

     try{
        const response= await axios.put(url,null,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        log(response)
        return response

     }catch(ex){
        log(ex)
        return null
     }

}

export async function status_Delivered(orderId)
{
    const url=createUrl('/api/admin/orders/'+orderId+'/deliver')
    const token=sessionStorage.getItem('token')

     try{
        const response= await axios.put(url,null,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        log(response)
        return response

     }catch(ex){
        log(ex)
        return null
     }

    
}

export async function status_Cancelled(orderId)
{
    const url=createUrl('/api/admin/orders/'+orderId+'/cancel')
    const token=sessionStorage.getItem('token')

     try{
        const response= await axios.put(url,null,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        log(response)
        return response

     }catch(ex){
        log(ex)
        return null
     }

    
}