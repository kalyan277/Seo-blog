import Link from 'next/link'
import React from 'react'
import Admin from '../../../components/auth/Admin'
import Category from '../../../components/crud/Category'
import Tag from '../../../components/crud/Tag'
import Layout from '../../../components/Layout'
export default function index(props) {
   
    return (
         <Layout isAuth ={props.isAuth}>
             <Admin>
             <div className="container-fluid">
                 <div className='row'>
                    <div className="col-md-12 pt-4 pb-5">
                        <h2>Manage Categories And Tags</h2>
                    </div>
                    <div className="col-md-6">
                        <ul className="list-group">
                            <li className="list-group-item">
                               <Category/>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                          <ul className="list-group">
                            <li className="list-group-item">
                               <Tag/>
                            </li>
                        </ul>
                    </div>
                 </div>
             </div>
             </Admin>
           
        </Layout>
    )
}
