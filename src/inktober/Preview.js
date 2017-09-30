import React from 'react'

import style from '../styles/upload.css'

export default class Popup extends React.Component {
    componentWillMount() {
        document.body.style.overflow = 'hidden'
    }

    componentWillUnmount() {
        document.body.style.overflow = 'auto'
    }

    render() {
        return (
            <div className={style.previewContainer}>
                <div className={style.previewImage} style={{backgroundImage: `url(${this.props.image})`}}></div>
                <div className={style.previewButton}>
                    <button className={style.confirmButton} onClick={this.props.onConfirm}>Upload</button>
                    <div className={style.cancel} onClick={this.props.onCancel}>Cancel</div>
                </div>
            </div>
        )
    }
}