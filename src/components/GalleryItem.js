import React from 'react'

import Popup from './Popup'
import style from '../styles/gallery.css'

export default class GalleryItem extends React.Component {
    constructor() {
        super()

        this.state = {
            isClicked: false
        }
    }

    onClick() {
        this.setState({
            isClicked: true
        })
    }

    onClose() {
        this.setState({
            isClicked: false
        })
    }

    render() {
        const popup = this.state.isClicked ? <Popup title={this.props.name} image={this.props.url} onClose={this.onClose.bind(this)} /> : <span />

        return (
            <div className={style.galleryItem} onClick={this.onClick.bind(this)}>
                <div className={style.galleryImage} style={{backgroundImage: `url(${this.props.url})`}}>
                    {popup}
                </div>
            </div>
        )
    }
}