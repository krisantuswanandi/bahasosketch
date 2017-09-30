import React from 'react'

import style from '../styles/gallery.css'

export default ({name, url, onClick}) => (
    <div className={style.galleryItem}>
        <div
            className={style.galleryImage}
            style={{backgroundImage: `url(${url})`}}
            onClick={() => { onClick(name, url) }}
        ></div>
    </div>
)