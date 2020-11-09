import Link from 'next/link'
import React from 'react'
import Admin from '../../../components/auth/Admin'
import BlogCreate from '../../../components/crud/BlogCreate'
import Tag from '../../../components/crud/Tag'
import Layout from '../../../components/Layout'
export default function Blog(props) {
   
    return (
         <Layout isAuth ={props.isAuth}>
             <Admin>
             <div className="container-fluid">
                 <div className='row'>
                    <div className="col-md-12 pt-4 pb-5">
                        <h2>Create A New Blog</h2>
                    </div>
                    <div className="col-md-12">
                        <ul className="list-group">
                            <li className="list-group-item">
                               <BlogCreate/>
                            </li>
                        </ul>
                    </div>
                 </div>
             </div>
             </Admin>
           
        </Layout>
    )
}
