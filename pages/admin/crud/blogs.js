import Link from 'next/link'
import React from 'react'
import Admin from '../../../components/auth/Admin'
import BlogRead from '../../../components/blog/BlogRead'
import BlogCreate from '../../../components/crud/BlogCreate'
import Tag from '../../../components/crud/Tag'
import Layout from '../../../components/Layout'
export default function Blogs(props) {
   
    return (
         <Layout isAuth ={props.isAuth} pages={'blogs'}>
             <Admin>
             <div className="container-fluid">
                 <div className='row'>
                    <div className="col-md-12 pt-4 pb-5">
                        <h2>Manage Blogs</h2>
                    </div>
                    <div className="col-md-12">
                        <ul className="list-group">
                            <li className="list-group-item">
                               <BlogRead/>
                            </li>
                        </ul>
                    </div>
                 </div>
             </div>
             </Admin>
           
        </Layout>
    )
}
