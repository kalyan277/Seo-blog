import React from 'react'
import Header from './Header'

export default function Layout(props) {
    return (
        <React.Fragment>
          <Header isAuth={props.isAuth}/>
           {props.children}
        </React.Fragment>
    )
}
