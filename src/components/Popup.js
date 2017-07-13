import React from 'react'

import style from '../styles/popup.css'

export default class Popup extends React.Component {
    onClose() {
        this.props.onClose()
    }

    render() {
        return (
            <div className={style.popup}>
                <div className={style.popupDialog}>
                    <div className={style.popupHeader}>
                        <span className={style.popupTitle}>{this.props.title}</span>
                        <span className={style.popupClose} onClick={this.onClose.bind(this)}>X</span>
                    </div>
                    <div className={style.popupBody}>
                        <img src={this.props.image} alt="Connection error!" className={style.popupImage}/>
                    </div>
                </div>
            </div>
        )
    }
}