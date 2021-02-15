import React,{useState,useEffect} from 'react'
import {signin,authenticate,isAuth} from '../../actions/auth'
import {Field,reduxForm} from 'redux-form';
import Link from "next/link";

import Router from 'next/router';
function SigninComponent(props) {
    const [values, setValues] = useState({
        error:'',
        loading:false,
        message:"",
        showForm:true
    })
   const {error,loading,message}=values
   const onSubmit = async(formValues)=>{
        setValues({loading:true,error:false})
        try {
            const response =await signin(formValues);
            console.log(response);
            if(response.error){
                setValues({error:response.error,loading:false})
            }else{
                authenticate(response,()=>{
                    
                    const auth=isAuth();
                  if( isAuth() &&  auth.role ===1){
                    Router.push('/admin');
                      props.updateLoginState(auth)
                  }else{
                      Router.push('/user');
                       props.updateLoginState(auth) 
                  }
                
                  //console.log(1);
                  props.reset()
                  
                })
            }
        } catch (error) {
           //console.error(error); 
        }
  
    }
    const showLoading = ()=>(loading ? <div className="alert alert-info">Loading...</div>:'');
    const showError = ()=>(error ? <div className="alert alert-danger">{error}</div>:'');
    const showMessage = ()=>(message ? <div className="alert alert-info">{message}</div>:'');
    const handelChange = name => (e)=>{
      setValues({...values,error:false,[name]:e.target.value})
    }


    const signinForm=()=>{
        return(
            <form onSubmit={props.handleSubmit(onSubmit)} >
                 <Field name ="email" component = {renderInput} label ="Enter Email" className="form-control" type="text"/>
                <Field name ="password" label="Enter Password" component = {renderInput} className="form-control" type="password"/>
                <div className="text-center">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
        )
    }
    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {signinForm()}
            <br/>
            <div className ="text-center">
                <Link href ='/auth/password/forgot'>
                    <a className="btn btn-outline-danger btn-sm">Reset Password</a>
                </Link>
            </div>
          
        </React.Fragment>
        
    )
}
 const validate = (formValue)=>{
        const errors={};
        if(!formValue.email){
            errors.email= 'Email Is Complusory'
        }
            if(!formValue.password){
            errors.password= 'Password Is Complusory'
        }
        return errors;
    }

    const renderInput=({input,label,className,meta,type})=>{
        return (
            <div className="field form-group">
                <label>{label}</label>
                <input{...input} className={className} type={type} autoComplete="off" />
            {meta.touched && meta.error &&(
            <div className="form-label">
                <div style={{color:"red"}}>{meta.error}</div>
            </div>
            )}
            </div>
        )    }

export default reduxForm({
    form:'signin',
    validate
})(SigninComponent);