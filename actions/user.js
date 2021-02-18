import axios from 'axios';
import cookie from 'js-cookie'
const axiosInstance = axios.create({
  baseURL: `${process.env.API}`
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


export const userPublicProfile = async(username)=>{
 // console.log(category);
     const url = `api/user/${username}`;
     return  await axiosInstance
    .get(url)
    .then((response) => response.data)
   
}


export const getProfile = async()=>{
 // console.log(category);
     const url = `api/profile`;
     return  await axiosInstance
    .get(url,setAuthHeader())
    .then((response) => response.data)
   
}

export const update = async(user)=>{
 // console.log(category);
     const url = `api/user/update`;
     return  await axiosInstance
    .put(url,user,setAuthHeader())
    .then((response) => response.data)
   .catch(error=> error.response);
   
}

