import React,{useState,useEffect} from 'react';
import Link from 'next/link';
import Router from 'next/router'
import {isAuth} from '../../actions/auth'
import {create, getTag, removeTag} from '../../actions/tag'
import {Field,reduxForm} from 'redux-form';
import Private from '../auth/Private';

const Tag =(props)=>{
    const[values,setValues] =useState({
        name:'',
        error:false,
        success:false,
        tags:[],
        removes:false,
        load:true,
    })
    useEffect(() => {
        if(values.load){
         loadTags()
         }
   
    },[values.load]);
   const loadTags =()=>{
       getTag().then(data=>{
           if(data.error){
               console.log(data.error)
           }else{
               setValues({...values,tags:data,load:true})
           }
       })
   }
   const showTags=()=>{
       //console.log(categories);
      if(tags !=undefined)
       return tags.map((t,i)=>{
           return(
               <button key={i} onDoubleClick={()=>deleleConfirm(t.slug)} title="Double Click To Delete " className="but btn-outline-primary mr-1 mt-1 mt-3">
                   {t.name}
               </button>
           )
       }
           
       )
   }

   const deleleConfirm = slug=>{
       let answer=window.confirm('Are you Sure You Want To Delete This Category?')
       if(answer){
           deleteTag(slug)
       }
   }
   const deleteTag=(slug)=>{
       removeTag(slug).then(
           data=>{
               if(data.error){
                   console.log(data.error)
               }else{
                   setValues({error:false,removes:false,load:true})
               }
           }
       )
   }
   const mouseMoveHandler = e=>{
        //  setValues({error:false,success:false,removes:false,load:false})
        setValues({...values,error:false,success:false,removes:false,load:false})
        //console.log(1)
   }
   const {name,error,success,tags,removes}=values
   const onSubmit = async(formValues)=>{
        setValues({loading:true,error:false})
        try {
            const response =await create(formValues);
           // console.log(response);
            if(response.error){
                setValues({...values,error:response.error,success:false})
            }else{
                 setValues({error:false,success:true,load:true})
                  props.reset();
            }
        } catch (error) {
           //console.error(error); 
        }
  
    }
    const showError = ()=>(error ? <div className="alert alert-danger text-center">{error}</div>:'');
    const showSuccess = ()=>(success ? <div className="text-success text-center">Tag is Created</div>:'');
     const showRemove = ()=>(removes ? <div className="text-info text-center">Tag Removed</div>:'');
    const TagForm=()=>{
        return(
            <div onMouseMove={mouseMoveHandler}>
             <form onSubmit={props.handleSubmit(onSubmit)} >
                 <Field name ="name" component = {renderInput} label ="Enter Tag Name" className="form-control" type="text"/>
                 <div className="text-center">
                    <button className="btn btn-primary">Create</button>
                </div>
            </form>
            </div>
           
        )
    }
    return (
        <Private>
        {showError()}
        {showSuccess()}
        {showRemove()}
        {TagForm()}
       
        <div>
            {showTags()}
        </div>
        </Private>
        
    )
}
 const validate = (formValue)=>{
        const errors={};
        if(!formValue.name){
            errors.name= 'Name Is Complusory'
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
    form:'tag',
    validate
})(Tag);