import axios from 'axios'
import { createUrl, log } from '../utils/utils'

export async function registerUser(
  firstName,
  lastName,
  email,
  password,
  mobile,
  role
) {
  const url = createUrl('/auth/signup')
  const body = {
    firstName,
    lastName,
    email,
    password,
    mobile,
    role
  }
  

  // wait till axios is making the api call and getting response from server
  try {
    const response = await axios.post(url, body)
    log(response.data)
    return response
  } catch (ex) {
    log(ex)
    return null
  }
}

export async function loginUser(email, password) {
  const url = createUrl('/auth/signin')
  const body = {
    email,
    password,
  }

  // wait till axios is making the api call and getting response from server
  try {
    const response = await axios.post(url, body)
    log("Auth ",response)
    return response
  } catch (ex) {
    log("Hello")
    log(ex)
    return null
  }
}
export async function updateUser(email,password){

  const url=createUrl('/auth/forgetpass')
  // const token=sessionStorage.getItem('token')
  const body={
      email,
      password
  }

  try{
      const response= await axios.put(url,body)
      log(response.data)
      return response

  }catch(ex){
      log(ex)
      return null
  }

}

export async function userProfile()
{
  const url=createUrl('/api/users/profile')

  const authToken=sessionStorage.getItem('token');

  try{
    const response=await axios.get(url,{
      headers:{
        Authorization: `Bearer ${authToken}`
      }
    })
    log(response.data)
    return response;

  }catch(ex){
    log(ex)
    return null


  }
}
