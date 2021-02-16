import React,{ useEffect } from 'react'
import Layout from '../components/Layout'
import Router from 'next/router';
import Head from 'next/head';
import SignupComponent from '../components/auth/SignupComponent'

export default function signup({isAuth}) {
       useEffect(() => {
        if(isAuth != ""){
           Router.push("/"); 
        }
      
    }, [])
const head = () => {
    return (
      <Head>
        <title>
          {`Sign Up`} | {process.env.APP_NAME}
        </title>
        {/* below is for facebook link share data show */}
      
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.DOMAIN}/Sign Up`} />
        <meta property="og:site_name" content={`${process.env.APP_NAME}`} />
        <meta
          property="og:image"
          content={`${process.env.DOMAIN}static/images/favicon.ico`}
        />
        <meta
          property="og:image:secure_url"
          content={`${process.env.DOMAIN}static/images/favicon.ico`}
        />
         <link rel="icon" type="image/ico" href="/static/images/favicon.ico" />
        <meta property="og:image:type" content="image/ico" />
        <meta property="fb:app_id" content={`${process.env.FB_APP_ID}`} />
      </Head>
    );
  };
    return (
    <React.Fragment>
        {head()}
        <Layout pages={'signup'}>
         <h2 className="text-center pt-4 pb-4">Signup Page</h2> 
         <div className="row">
            <div className="col-md-6 offset-md-3">
            <SignupComponent/>
            </div>     
        </div>
        </Layout>
    </React.Fragment> 
    )
}
