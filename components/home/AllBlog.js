
import React, { useEffect, useState } from 'react'
import BlogCard from '../cards/BlogCard';
//import { getProducts } from '../functions/product';
import {Pagination,Spin} from 'antd'
import { getBlogsdata, getBlogsTotalCount } from '../../actions/blog';
const AllBlog = ()=> {
    const [produts,setProducts]=useState([]);
    const [loading,setLoading] =useState(false);
    const [page,setPage] =useState(1);
    const [productsCount ,setProductsCount]=useState(0);
    useEffect(()=>{
        loadAllProducts() 
    },[page]);
      useEffect(()=>{
         getBlogsTotalCount().then((res)=> setProductsCount(res.data));
    },[]);
    const loadAllProducts = () => {
        setLoading(true);
        getBlogsdata("createdAt","desc",page)
         .then((res)=>{
              setProducts(res.data);
              setLoading(false);
            })
         .catch((err)=> {
             console.log(err);
             setLoading(false);
         }) 
    }
    return (

        <React.Fragment>
 
                <div className="container">
                    {loading ? (<Spin/>) :(
                    <div className="row">
                          {produts.map((p)=>{
                       return (
                           <div className="col-md-4 text-center" key={p._id} >
                               <BlogCard blog={p}/>
                           </div>
                        )
                      })}
                         {produts.length === 0 &&(
                            <h1 className="blognopost">No Blog Posted ..</h1>
                        )}
                 </div>
                    )}
                </div>  
                <div className="row">
                    <nav className="col-md-4 offset-md-4 text-center pt-5 p-3 paginali">
                      <Pagination current={page}
                        total={(productsCount / 3) * 10}
                        onChange={(value) => setPage(value)}/> 
                    </nav>
                </div>
              

        </React.Fragment>
    )
}

export default AllBlog;