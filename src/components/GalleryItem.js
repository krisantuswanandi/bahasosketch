import React from 'react'

import style from '../styles/gallery.css'

export default class GalleryItem extends React.Component {
    render() {
        const {name, url, click} = this.props

        return (
            <div className={style.galleryItem}>
                <div className={style.galleryImage} style={{backgroundImage: `url(${url})`}} onClick={() => { click(name, url) }}></div>
            </div>
        )
    }
}