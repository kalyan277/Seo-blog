import React from 'react'
import Layout from '../components/Layout'
import Jumbtron from '../components/cards/Jumbtron';
import AllBlog from '../components/home/AllBlog';
import OldBlog from '../components/home/OldBlog';
import Head from 'next/head';

function index(props) {
    const head = () => {
    return (
      <Head>
        <title>
          {`Landing Page`} | {process.env.APP_NAME}
        </title>
        {/* below is for facebook link share data show */}
      
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.DOMAIN}/Landing Page`} />
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
    //console.log(props.isAuth)
        return (
     <React.Fragment>
         {head()}
        <Layout isAuth ={props.isAuth}>
               <div className="jumbotron text-danger h1 font-weight-bold text-center">
                <Jumbtron text={["Latest Blogs","New Blogs","Old Blogs"]} />
                </div>
                <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">All Blogs</h4>
                <AllBlog/>

                 <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">Old Blogs</h4>
                <OldBlog/>
                <br/>
                <br/>
        </Layout>
    </React.Fragment>
    )
}





export default index









