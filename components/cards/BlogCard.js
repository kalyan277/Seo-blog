import React from 'react'
import {Card} from 'antd'
import {EyeOutlined} from '@ant-design/icons'
import Router from 'next/router';

const {Meta} =Card
const BlogCard =({blog})=>{
    const {title,mdesc,slug} = blog
    return (
    <React.Fragment>
    <Card 
    cover ={
        <img src ={`${process.env.API}api/blog/photo/${slug}`} 
        style={{height:"150px",ObjectFit:"cover",width: "100%" }}
        className="p-1" />
    }

     actions={[
        <React.Fragment>
             <EyeOutlined className="text-danger viewicon" onClick={() => Router.push(`/blogs/${slug}`)} />
        </React.Fragment>
     ]}
    >
    <Meta title ={title} description={`${mdesc && mdesc.substring(0,40)}...`}/>
    </Card>
    </React.Fragment>
    );
};

export default BlogCard;