import React from 'react'

import style from '../../styles/gallery.css'

export default ({photo: {name, image}, click}) => (
    <div className={style.galleryItem}>
        <div className={style.galleryImage} style={{backgroundImage: `url(${image})`}} onClick={() => { click(name, image) }}></div>
    </div>
)