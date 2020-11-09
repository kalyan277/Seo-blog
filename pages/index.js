import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'

function index(props) {
    //console.log(props.isAuth)
    return (
        <Layout isAuth ={props.isAuth}>
            <h2>Hii</h2>
        </Layout>
    )
}





export default index