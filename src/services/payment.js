import axios from "axios"
import { createUrl, log } from "../utils/utils"


export async function generatePaymentLink(orderId){

    const token=sessionStorage.getItem('token')

    const url=createUrl('/api/payments/'+orderId)

    try{

        const response= await axios.post(url,null,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        log(response.data)
        return response

    }catch(ex){
        log(ex)
        return null
    }

}


export async function paymentDetails(payment_id,order_id){

    const url=createUrl('/api/payments')

    try{
        const response= await axios.get(url,{
            params:{
                payment_id:payment_id,
                order_id:order_id
            }
            
        })
        return response

    }catch(ex){
        log(ex)
        return null
    }

}