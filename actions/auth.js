import axios from 'axios';
import cookie from 'js-cookie'
import { Router } from 'next/router';
//console.log(process.env.API);
const axiosInstance = axios.create({
  baseURL: `${process.env.API}`,
  timeout:9000
});

export const handleResponse=response=>{
  if(response.status ===401){
    signout(()=>{
     Router.push({
      pathname:'api/signin',
      query:{
        message:'Your Session is Expired.Please Sign in '
      }
    })
    })
  
  }else{
    return;
  }
}



export const signup = async({token})=>{
     const url = "api/signup";
  return  await axiosInstance

    .post(url, {token:token})
    .then((response) => response.data)
    .catch(error=> error.response.data);
   
}


export const signin = async(user)=>{
     const url = "api/signin";
  return  await axiosInstance
    .post(url, user)
    .then((response) => response.data)
    .catch(error=> error.response.data);
   
}


//set cookie
export const setCookie =(key,value)=>{
  //check the client side
  if(process.browser){
    cookie.set(key,value,{
      expires:1
    });
  }
}

//remove Cookie
export const removeCookie =(key)=>{
  if(process.browser){
    cookie.remove(key,{
      expires:1
    });
  }
}

//getCookie
export const getCookie =(key)=>{
  if(process.browser){
    return cookie.get(key);
  }
}
//localstorage
export const setLocalStorage =(key,value)=>{
  if(process.browser){
    localStorage.setItem(key,JSON.stringify(value))
  }
}

//remove from local storage
export const removeLocalStorage =(key)=>{
  if(process.browser){
    localStorage.removeItem(key)
  }
}

//Authenticated method

export const authenticate =(data,next) =>{
  setCookie('token',data.token)
  setLocalStorage('user',data.user);
  next();
}

export const isAuth = () =>{
  if(process.browser){
    const cookieChecked =getCookie('token')
    if(localStorage.getItem('user')){
      return JSON.parse(localStorage.getItem('user'))
    }else{
      return false;
    }
  }
}


export const redux = () =>dispatch =>
 {
   let cookieval="";
   if(process.browser){
    const cookieChecked =getCookie('token')
    if(localStorage.getItem('user')){
      cookieval=  JSON.parse(localStorage.getItem('user'))
    }else{
        cookieval =false;
    }
}
 dispatch({type:'CHECK_AUTH',payload: cookieval})
}

export const signout = async (next)=>{
removeCookie('token')
removeLocalStorage('user')
next()
const url = "api/signout";
return  await axiosInstance
    .get(url)
    .then((response) => console.log('Signout Success'))
    .catch(error=> error.response.data);
  
}

export const updateUser = async(user,next)=>{
 // console.log(category);
 if(process.browser){
   if(localStorage.getItem('user')){
     let auth =JSON.parse(localStorage.getItem('user'))
       localStorage.setItem('user',JSON.stringify(auth))
       next()
     }
   }
 }

 export const forgotPassword = async(email)=>{
     const url = "api/forgot-password";
  return  await axiosInstance
    .put(url,email)
    .then((response) => response.data)
    .catch(error=> error.response.data);
   
}

 export const resetPassword = async(resetInfo)=>{
     const url = "api/reset-password";
  return  await axiosInstance
    .put(url,resetInfo)
    .then((response) => response.data)
    .catch(error=> error.response.data);
   
}

 export const preSignup = async(user)=>{
     const url = "api/pre-signup";
  return  await axiosInstance
    .post(url,user)
    .then((response) => response.data)
    .catch(error=> error.response.data);
   
}


