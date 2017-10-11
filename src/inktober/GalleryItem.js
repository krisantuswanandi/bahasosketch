import React from 'react'

import style from '../styles/gallery.css'

export default ({name, thumb, url, onClick}) => (
    <div className={style.galleryItem}>
        <div
            className={style.galleryImage}
            style={{backgroundImage: `url(${thumb})`}}
            onClick={() => { onClick(name, url) }}
        ></div>
    </div>
)