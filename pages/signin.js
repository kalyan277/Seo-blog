import Head from 'next/head';
import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import {withRouter} from 'next/router'
import SigninComponent from '../components/auth/SigninComponent'
import Router from 'next/router';
const signin=({router,updateLoginState,isAuth})=> {

const head = () => {
    return (
      <Head>
        <title>
          {`Sign In`} | {process.env.APP_NAME}
        </title>
        {/* below is for facebook link share data show */}
      
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.DOMAIN}/Sign In`} />
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
    useEffect(() => {
        if(isAuth != ""){
           Router.push("/"); 
        }
      
    }, [])
    const showRedirectMessage =()=>{
        if(router.query.message){
        return <div className="alert alert-danger">{router.query.message}</div> 
        }else{
            return
        }
    }
    return (
    <React.Fragment>
        {head()}
        <Layout pages={'signin'}>
            <h2 className="text-center pt-4 pb-4">Login</h2> 
                 <div className="row">
                        <div className="col-md-6 offset-md-3">
                            {showRedirectMessage()}
                        </div>       
                 </div> 
        
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <SigninComponent updateLoginState={updateLoginState}/>
                    </div>     
                </div> 
        </Layout>
        </React.Fragment>
    )
}

export default withRouter(signin)
