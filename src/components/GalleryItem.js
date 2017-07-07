import React from 'react'

import style from '../styles/gallery.css'

export default class GalleryItem extends React.Component {
    onClick() {
        alert('a')
    }

    render() {
        return (
            <div className={style.galleryItem} data-user={this.props.name} data-src={this.props.url} onClick={this.onClick.bind(this)}>
                <div className={style.galleryImage} style={{backgroundImage: `url(${this.props.url})`}}></div>
            </div>
        )
    }
}