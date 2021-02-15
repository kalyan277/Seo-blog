import axios from 'axios';
import cookie from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: `${process.env.API}`,
  timeout:9000
});


const setAuthHeader = () => {
let token='';
  if(process.browser){
    token= cookie.get('token');
  }else{
    token= false;
  }
  if(token){
    return {headers : {'authorization' : `Bearer ${token}`}};
}
return undefined;
}


export const create = async(tag)=>{
     const url = "api/tag";
  return  await axiosInstance
    .post(url, tag,setAuthHeader())
    .then((response) => response.data)
   
}

export const getTag = async()=>{
     const url = "api/tags";
  return  await axiosInstance
    .get(url)
    .then((response) => response.data)
   
}

export const singleTag = async(slug)=>{
     const url = `api/tag/${slug}`;
  return  await axiosInstance
    .get(url)
    .then((response) => response.data)
   
}

export const removeTag = async(slug)=>{
     const url = `api/tag/${slug}`;
  return  await axiosInstance
    .delete(url,setAuthHeader())
    .then((response) => response.data)
   
}