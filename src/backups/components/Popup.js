import React from 'react'

import style from '../../styles/popup.css'

export default class Popup extends React.Component {
    componentWillMount() {
        document.body.style.overflow = 'hidden'
    }

    componentWillUnmount() {
        document.body.style.overflow = 'auto'
    }

    render() {
        return (
            <div className={`${style.popup}`} onClick={() => {this.props.close()}}>
                <div className={style.popupDialog} onClick={(event) => {event.stopPropagation()}}>
                    <div className={style.popupHeader}>
                        <span className={style.popupTitle}>{this.props.title}&nbsp;</span>
                        <span className={style.popupClose} onClick={() => {this.props.close()}}>X</span>
                    </div>
                    <div className={style.popupBody}>
                        {this.props.image === '' ? <div className={style.loading}>Loading...</div> : <img src={this.props.image} alt="Image" className={style.popupImage}/>}
                    </div>
                </div>
            </div>
        )
    }
}