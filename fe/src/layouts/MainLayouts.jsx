import React from 'react'
import MyNav from '../components/navigationbar/MyNavbar'



const MainLayout = ({ children }) => {
    return (
        <>
            <MyNav/>
            {children}
            
        </>
    )
}

export default MainLayout