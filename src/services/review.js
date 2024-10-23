import axios from "axios";
import { createUrl, log } from "../utils/utils";



export async function createReview(productId,review){

    const url=createUrl('/api/reviews/create')
    const token=sessionStorage.getItem('token')

    const body={
        productId,
        review
    }

    try{

        const response= await axios.post(url,body,{
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