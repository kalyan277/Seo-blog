import React,{useState,useEffect} from 'react';
import Link from 'next/link';
import Router from 'next/router'
import {isAuth} from '../../actions/auth'
import {create, getCategory, removeCategory} from '../../actions/category'
import {Field,reduxForm} from 'redux-form';
import Private from '../auth/Private';

const Category =(props)=>{
    const[values,setValues] =useState({
        name:'',
        error:false,
        success:false,
        categories:[],
        removes:false,
        load:true,
    })
    useEffect(() => {
        if(values.load){
         loadCategories()
         }
   
    },[values.load]);
   const loadCategories =()=>{
       getCategory().then(data=>{
           if(data.error){
               console.log(data.error)
           }else{
               setValues({...values,categories:data,load:true})
           }
       })
   }
   const showCategories=()=>{
       //console.log(categories);
      if(categories !=undefined)
       return categories.map((c,i)=>{
           return(
               <button key={i} onDoubleClick={()=>deleleConfirm(c.slug)} title="Double Click To Delete " className="but btn-outline-primary mr-1 mt-1 mt-3">
                   {c.name}
               </button>
           )
       }
           
       )
   }

   const deleleConfirm = slug=>{
       let answer=window.confirm('Are you Sure You Want To Delete This Category?')
       if(answer){
           deleteCategory(slug)
       }
   }
   const deleteCategory=(slug)=>{
       removeCategory(slug).then(
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
   const {name,error,success,categories,removes}=values
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
    const showSuccess = ()=>(success ? <div className="text-success text-center">Category is Created</div>:'');
     const showRemove = ()=>(removes ? <div className="text-info text-center">Category Removed</div>:'');
    const categoryForm=()=>{
        return(
            <div onMouseMove={mouseMoveHandler}>
             <form onSubmit={props.handleSubmit(onSubmit)} >
                 <Field name ="name" component = {renderInput} label ="Enter Category Name" className="form-control" type="text"/>
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
        {categoryForm()}
       
        <div>
            {showCategories()}
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
    form:'category',
    validate
})(Category);