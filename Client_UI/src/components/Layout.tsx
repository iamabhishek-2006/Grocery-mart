import React, { type PropsWithChildren } from 'react'
import Navbar from './Navbar'
import LoginPopup from './LoginPopUp'

const Layout = ({children}:PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <LoginPopup />
      <main > {children}</main>  
    </>
  );
}

export default Layout