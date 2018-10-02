import React from 'react'

import Gallery from './Gallery'
import style from '../../styles/gallery.css'

const GalleryContainer = ({data}) => {
    const galleries = data.map((gallery, index) => <Gallery key={index.toString()} data={gallery}/>)

    return (
        <div className={style.galleryContainer}>
            {galleries}
        </div>
    )
}

export default GalleryContainer