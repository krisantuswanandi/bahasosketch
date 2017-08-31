import React from 'react'

import Header from './Header'
import Footer from './Footer'
import Home from './Home'

import style from '../styles/index.css'

export default () => (
    <div className={style.container}>
        <Header/>
        <Home/>
        <Footer/>
    </div>
)