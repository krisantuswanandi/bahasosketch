import React from 'react'

import style from '../styles/gallery.css'

export default ({text}) => (
    <div className={style.galleryItem}>
        <div className={style.galleryTitle}>
            <span className={style.text}>{text}</span>
            <span>OCTOBER</span>
        </div>
    </div>
)