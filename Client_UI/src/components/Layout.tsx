import React, { type PropsWithChildren } from 'react'
import Navbar from './Navbar'
import LoginPopup from './LoginPopUp'
// import Footer from './Footer';

const Layout = ({children}:PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <LoginPopup />
      <main> {children}</main>
      {/* <Footer/> */}
    </>
  );
}

export default Layout