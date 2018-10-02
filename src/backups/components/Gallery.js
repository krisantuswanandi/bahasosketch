import React from 'react'
import firebase from 'firebase/app'
import 'firebase/storage'

import GalleryItem from './GalleryItem'
import Popup from './Popup'
import Upload from './Upload'
import style from '../../styles/gallery.css'

export default class Gallery extends React.Component {
    constructor() {
        super()

        this.state = {
            isPopupOpen: false,
            popupImage: '',
            popupTitle: ''
        }

        this.openPopup = this.openPopup.bind(this)
        this.closePopup = this.closePopup.bind(this)
    }

    openPopup(popupTitle, popupImage) {
        this.setState({
            isPopupOpen: true
        })
        
        firebase.storage().ref('popup/' + popupImage).getDownloadURL().then(url => {
            this.setState({
                popupImage: url,
                popupTitle
            })
        }).catch(error => {
            console.log(error.message)
        })
    }

    closePopup() {
        this.setState({
            isPopupOpen: false,
            popupImage: '',
            popupTitle: ''
        })
    }

    render() {
        const {data: {title, theme, photos}} = this.props
        const upload = this.props.upload || false

        const datas = photos.map((photo, index) => <GalleryItem key={photo.path} photo={photo} click={this.openPopup}/>)
        const items = upload ? [<Upload key="upload"/>, ...datas] : datas

        return (
            <div className={style.gallery}>
                {this.state.isPopupOpen && <Popup title={this.state.popupTitle} image={this.state.popupImage} close={this.closePopup}/>}
                <div className={style.galleryTitle}>{title}</div>
                <div className={style.galleryTheme}>{theme}</div>
                <div className={style.galleryItems}>{items}</div>
            </div>
        )
    }
}