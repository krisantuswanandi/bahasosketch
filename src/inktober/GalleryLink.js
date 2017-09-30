import React from 'react'

import style from '../styles/gallery.css'

export default ({url, link}) => (
    <div className={style.galleryItem}>
        <a
            target="_blank"
            href={link}
            className={style.galleryImage}
            style={{backgroundImage: `url(${url})`}}
            //onClick={() => { click(name, url) }}
        ></a>
    </div>
)