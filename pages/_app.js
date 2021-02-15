import "bootstrap/dist/css/bootstrap.min.css";
import React,{useState,useEffect} from 'react'
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';
import reducers from '../reducers'
import thunk from 'redux-thunk'
import {isAuth} from '../actions/auth'
import '.././node_modules/nprogress/nprogress.css'
import'../static/styles.css'
import "antd/dist/antd.css";


  // global.window = {document: {createElementNS: () => {return {}} }};window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
const composeEnhancers = compose
const store =createStore(reducers,composeEnhancers(applyMiddleware(thunk)))

export default function SEOBLOG({ Component, pageProps }) {
   const [isAuthval, setAuthval] = useState({
      })
      useEffect (()=>{
          
      if(!isAuth()){
         setAuthval(false) 
      }else{
        setAuthval({...isAuth()})
      }
  },[]);
  const updateLoginState=(isAuth)=>{
   // console.log(isAuth)
    setAuthval({...isAuth})
  }
  //console.log(isAuthval)
  return(
    
  <Provider store={store}>
    <Component {...pageProps} isAuth ={isAuthval} updateLoginState={updateLoginState} />
  </Provider>)
}




