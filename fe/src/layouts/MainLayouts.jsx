import React from 'react'
import MyNav from '../components/navigationbar/MyNavbar'
import Footer from '../components/footer/Footer'




const MainLayout = ({ children }) => {
    return (
        <>
            <MyNav/>
            {children}
            <Footer/>
        </>
    )
}

export default MainLayout