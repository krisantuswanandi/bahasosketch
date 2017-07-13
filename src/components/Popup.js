import React from 'react'

import style from '../styles/popup.css'

export default class Popup extends React.Component {
    render() {
        return (
            <div className={`${style.popup}`} onClick={() => {this.props.close()}}>
                <div className={style.popupDialog} onClick={(event) => {event.stopPropagation()}}>
                    <div className={style.popupHeader}>
                        <span className={style.popupTitle}>{this.props.title}</span>
                        <span className={style.popupClose} onClick={() => {this.props.close()}}>X</span>
                    </div>
                    <div className={style.popupBody}>
                        <img src={this.props.image} alt="Image" className={style.popupImage}/>
                    </div>
                </div>
            </div>
        )
    }
}