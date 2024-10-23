import axios from 'axios'
import { createUrl, log } from '../utils/utils'

export async function getProductList() {
  const url = createUrl('/')

  try {
    // get the current user's token from session storage
    const { token } = sessionStorage

    // create a header to send the token
    const header = {
      headers: {
        token,
      },
    }

    // make the api call using the token in the header
    const response = await axios.get(url)
    log(response.data)
    log(response.status)
    log(response.headers)
    return response;
  } catch (ex) {
    log(ex)
    return null
  }
}


export async function getSearchedProductsList(name){

  const url=createUrl('/api/products/search')

  try{
    const response= await axios.get(url,{
      params:{
        q:name
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



