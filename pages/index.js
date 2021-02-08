import React from 'react'
import Layout from '../components/Layout'
import Jumbtron from '../components/cards/Jumbtron';
import AllBlog from '../components/home/AllBlog';
import OldBlog from '../components/home/OldBlog';

function index(props) {
    //console.log(props.isAuth)
        return (
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
    )
}





export default index









