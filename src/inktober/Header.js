import React from 'react'

import image from '../images/inktoberh.png'
import style from '../styles/index.css'

export default () => (
    <header>
        <img className={style.headerLogo} src={image} alt="Bahaso Sketch Logo"/>
    </header>
)