import React from 'react'

import image from '../images/logo.png'
import style from '../styles/header.css'

const Header = ({theme}) => {
    return (
        <header>
            <div className={style.headerLogo}>
                <img className={style.headerLogoImage} src={image} alt="Bahaso Sketch Logo"/>
            </div>
            <div className={style.headerTheme}>
                <div className={style.headerThemeDesc}>TODAY'S THEME</div>
                <div className={style.headerThemeTitle}>{theme || 'Loading...'}</div>
            </div>
        </header>
    )
}

export default Header