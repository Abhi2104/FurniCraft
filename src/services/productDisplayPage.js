import axios from "axios";
import { createUrl, log } from "../utils/utils";



export async function getReviewsOfProduct(productId){

    const url=createUrl('/api/reviews/product/'+productId)

    const token=sessionStorage.getItem('token')

    try{
        const response= await axios.get(url,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        //log(response.status)
        //log(response)
        return response

    }catch(ex){
        log(ex)
        return null

    }


}


export async function  getProductDetails(productId){
    const url=createUrl('/api/products/id/'+productId)
    const token=sessionStorage.getItem('token')

    try{
        const response= await axios.get(url,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        log(response.status)
        log(response)
        return response

    }catch(ex){
        log(ex)
        return null
    }

}

export async function getProductRatings(productId){

    const url=createUrl('/api/ratings/product/avgRate/'+productId)

    const token=sessionStorage.getItem('token')

    try{
        const response=await axios.get(url,{
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