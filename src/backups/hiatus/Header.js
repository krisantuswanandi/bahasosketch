import React from 'react'

import image from '../../images/logo.png'
import style from '../styles/header.css'

export default ({theme}) => (
    <header>
        <div className={style.headerLogo}>
            <img className={style.headerLogoImage} src={image} alt="Bahaso Sketch Logo"/>
        </div>
        <div className={style.headerTheme}>
            <div className={style.headerThemeTitle}>BAHASO SKETCH</div>
        </div>
    </header>
)