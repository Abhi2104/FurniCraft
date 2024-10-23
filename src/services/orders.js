import axios from "axios";
import { createUrl, log } from "../utils/utils";



export async function createOrder(firstName,lastName,streetAddress,city,state,zipCode){

    const url=createUrl('/api/orders/')
    const token=sessionStorage.getItem("token")

    const body={
        firstName,
        lastName,
        streetAddress,
        city,
        state,
        zipCode

    }

    try{
        const response= await axios.post(url,body,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        // log("Hello Boi")
        // log(response)
        return response
       
    }catch(ex){
        log(ex)
        return null
        

    }
}


export async function getUserOrders(){

    const url=createUrl('/api/orders/user')
    const token=sessionStorage.getItem("token")

    try{
        const response= await axios.get(url,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response;

    }catch(ex){
        log(ex)
        return null;

    }
}