import React,{ useEffect } from 'react'
import Layout from '../components/Layout'
import Router from 'next/router';
import SignupComponent from '../components/auth/SignupComponent'

export default function signup({isAuth}) {
       useEffect(() => {
        if(isAuth != ""){
           Router.push("/"); 
        }
      
    }, [])
    return (
        <Layout pages={'signup'}>
         <h2 className="text-center pt-4 pb-4">Signup Page</h2> 
         <div className="row">
            <div className="col-md-6 offset-md-3">
            <SignupComponent/>
            </div>     
        </div> 
        
        </Layout>
    )
}
