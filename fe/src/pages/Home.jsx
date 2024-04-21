import React from 'react'
import Articles from "../components/articles/Articles"
import MainLayout from '../layouts/MainLayouts'
import MyJumbotron from '../components/jumbotron/Jumbotron'



const Home = () => {

    return (
        <MainLayout>
            <MyJumbotron/>
            <Articles />
        </MainLayout>
    )
}

export default Home