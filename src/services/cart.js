import axios from 'axios'
import { createUrl, log } from '../utils/utils'


export async function getUserCart(token)
{
    const url=createUrl('/api/cart/')

    try{ 
        const response= await axios.get(url,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response

    }catch(ex){
        log(ex)
        return null
    }

}

export async function getEachCartItem(token)
{
    const url=createUrl('/api/cart/all')

    try{
        const response= await axios.get(url,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response

    }catch(ex){
        log(ex)
        return null
    }
    

}

export async function updateCartItem(cartItemId,quantity,token)
{
    const url=createUrl('/api/cart_items/'+cartItemId)
    const body={
        quantity
    }

    try{
        const response= await axios.put(url,body,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        log(response)

    }catch(ex){
       log(ex)
       return null
    }
}

export async function deleteCartItemController(cartItemId)
{
    const url=createUrl('/api/cart_items/'+cartItemId)
    const token=sessionStorage.getItem('token')

    try{
        const response= await axios.delete(url,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        log(response.status)
        return response

    }catch(ex){
      log(ex)
      return null
    }

}

export async function addThisItemTocart(productId,quantity)
{

    const url=createUrl('/api/cart/add')
    const token=sessionStorage.getItem('token')
    const body={
        productId,
        quantity,
        //size
    }

    try{
        const response= await axios.post(url,body,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        log(response.data)
        log(response.status)

    }catch(ex)
    {
        log(ex)
        return null

    }
}