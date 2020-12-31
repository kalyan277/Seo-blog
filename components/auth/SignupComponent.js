import React,{useState,useEffect} from 'react'
import {isAuth, preSignup} from '../../actions/auth'
import Router from "next/router";

export default function SignupComponent(props) {
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        loading:false,
        message:"",
        showForm:true
    })

    const {name,email,password,error,loading,message,showForm}=values
    const handleSubmit = async(e)=>{
        e.preventDefault()
        setValues({...values,loading:true,error:false})
        const user={name,email,password}
        try {
            const response =await preSignup(user);
           // console.log(response);
            if(response.error){
                setValues({...values,error:response.error,loading:false})
            }else{
                setValues({...values,name:'',email:'',password:'',error:'',loading:false,message:response.message,
            showForm:false})
            }
        } catch (error) {
           //console.error(error); 
        }
  
    }

      useEffect (()=>{
        isAuth() && Router.push('/')
    },[]);
    const showLoading = ()=>(loading ? <div className="alert alert-info">Loading...</div>:'');
    const showError = ()=>(error ? <div className="alert alert-danger">{error}</div>:'');
    const showMessage = ()=>(message ? <div className="alert alert-info">{message}</div>:'');
    const handelChange = name => (e)=>{
      setValues({...values,error:false,[name]:e.target.value})
    }
    const signupForm=()=>{
        return(
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <input value={name} onChange={handelChange('name')} type="text" className="form-control" placeholder="Type Your Name"/>
                </div>
                  <div className="form-group">
                <input value={email} onChange={handelChange('email')} type="email" className="form-control" placeholder="Type Your Email"/>
                </div>
                  <div className="form-group">
                <input value={password} onChange={handelChange('password')} type="password" className="form-control" placeholder="Type Your Password"/>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary">SignUp</button>
                </div>
            </form>
        )
    }
    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
        {signupForm()}
        </React.Fragment>
        
    )
}
