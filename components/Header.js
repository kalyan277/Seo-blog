import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import {signout,isAuth} from '../actions/auth'
import Link from 'next/link';
import Router from 'next/router';
import nProgress from 'nprogress';
import Search from './blog/Search';
const APP_NAME=process.env.APP_NAME
Router.onRouteChangeStart = url =>nProgress.start()
Router.onRouteChangeComplete = url =>nProgress.done()
Router.onRouteChangeError = url =>nProgress.done()

const Header = (props) => {
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(!isOpen);
//console.log(props.isAuth.role)
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">{APP_NAME}</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          {!(props.isAuth) && (
            <React.Fragment>
             <NavItem>
                  <Link href="/blogs">
             <NavLink style={{cursor:"pointer"}} >Blogs</NavLink>
                  </Link>
            </NavItem>
               <NavItem>
                  <Link href="/contact">
             <NavLink style={{cursor:"pointer"}} >Contact</NavLink>
                  </Link>
            </NavItem>
           <NavItem>
              <Link href="/signin">
                  <NavLink style={{cursor:"pointer"}}>Signin</NavLink>
              </Link>
            </NavItem>
             <NavItem>
              <Link href="/signup">
                  <NavLink style={{cursor:"pointer"}} >Signup</NavLink>
              </Link>
            </NavItem>

           
            </React.Fragment>
          )}

             {props.isAuth && props.isAuth.role === 0 && (
                <NavItem>
                  <Link href="/user">
             <NavLink style={{cursor:"pointer"}} >{`${props.isAuth.name}'s Dashboard`}</NavLink>
                  </Link>
                  
            </NavItem>
            )}

                {props.isAuth && props.isAuth.role === 1 && (
                <NavItem>
                  <Link href="/admin">
             <NavLink style={{cursor:"pointer"}} >{`${props.isAuth.name}'s Dashboard`}</NavLink>
                  </Link>
                  
            </NavItem>
            )}

            {props.isAuth && (
              <React.Fragment>
              <NavItem>
                  <Link href="/blogs">
             <NavLink style={{cursor:"pointer"}} >Blogs</NavLink>
                  </Link>
            </NavItem>
            <NavItem>
             <NavLink href="/user/crud/create" style={{cursor:"pointer"}}className="btn btn-primary text-light" >Write A Blogs</NavLink>      
            </NavItem>
            <NavItem>
                  <NavLink style={{cursor:"pointer"}} onClick={()=> signout(()=> console.log("Logging Out"))}>Signout</NavLink>
            </NavItem>
            </React.Fragment>
            )}
           

          </Nav>
        </Collapse>
      </Navbar>
    <Search/>
    </div>
  );
}

export default Header;