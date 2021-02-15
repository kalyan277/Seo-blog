import Link from 'next/link'
import React from 'react'
import Admin from '../../components/auth/Admin'
import Layout from '../../components/Layout'
export default function index(props) {
   
    return (
         <Layout isAuth ={props.isAuth} pages={"dashboard"}>
             <Admin>
             <div className="container-fluid">
                 <div className='row'>
                    <div className="col-md-12 pt-4 pb-5">
                        <h2>Admin Dashboard</h2>
                    </div>
                    <div className="col-md-4">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link href='/admin/crud/category-tag'>
                                    <a>Create Category /Tag</a>
                                </Link>
                            </li>
                              <li className="list-group-item">
                                    <a href='/admin/crud/blog'>Create Blog</a>
                            </li>
                               <li className="list-group-item">
                                <Link href='/admin/crud/blogs' >
                                    <a>Update/Delete Blogs</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-8">
                       
                    </div>
                 </div>
             </div>
             </Admin>
           
        </Layout>
    )
}
