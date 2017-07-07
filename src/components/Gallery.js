import React from 'react'

import GalleryItem from './GalleryItem'
import Uploada from './Upload'
import style from '../styles/gallery.css'

const Gallery = ({data: {title, theme, photos}, upload = false}) => {
    const datas = photos.map((photo, index) => <GalleryItem key={index} name={photo.name} url={photo.url}/>)
    const items = upload ? [<Uploada key="upload"/>, ...datas] : datas

    return (
        <div className={style.gallery}>
            <div className={style.galleryTitle}>{title}</div>
            <div className={style.galleryTheme}>{theme}</div>
            <div className={style.galleryItems}>{items}</div>
        </div>
    )
}

export default Gallery