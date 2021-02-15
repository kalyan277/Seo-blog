import React from 'react'
import {Card} from 'antd'
import Router from 'next/router';


const {Meta} =Card
const BlogCard =({blog})=>{
    const {title,mdesc,slug} = blog
    return (
    <React.Fragment>
    <Card  onClick={() => Router.push(`/blogs/${slug}`)}
    cover ={
        <img src ={`${process.env.API}api/blog/photo/${slug}`} 
        style={{height:"150px",ObjectFit:"cover",width: "100%" }}
        className="p-1" />
    }
    >
    <Meta title ={title} description={`${mdesc && mdesc.substring(0,40)}...`}/>
    </Card>
    </React.Fragment>
    );
};

export default BlogCard;