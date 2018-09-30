import React from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

import GalleryItem from './GalleryItem'
import GalleryTitle from './GalleryTitle'
import GalleryLink from './GalleryLink'
import Popup from './Popup'
import style from '../styles/gallery.css'

class GalleryContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            images: [
                {id: 'intro', type: 'credit', link: 'https://www.instagram.com/p/BnT1LhRgard/', url: 'https://scontent-sit4-1.cdninstagram.com/vp/4c84bbb0f608fc3eead1606ad2703750/5C56766E/t51.2885-15/e35/40432064_560631531021277_1406291162821026460_n.jpg'},
                {id: 'themes', type: 'credit', link: 'https://www.instagram.com/p/BnL2dxfg8Uq/', url: 'https://scontent-sit4-1.cdninstagram.com/vp/59f6ee7e0f9cbb3fc8606ac72b4e91c5/5C4330DC/t51.2885-15/e35/39815925_407430529786848_2695135490553675776_n.jpg'}
            ],
            isPopupOpen: false,
            popupImage: '',
            popupTitle: ''
        }

        this.openPopup = this.openPopup.bind(this)
        this.closePopup = this.closePopup.bind(this)
    }

    componentDidMount() {
        const dbRef = firebase.database().ref('/inktober2018')
        dbRef.once('value').then(data => {
            const photos = []
            const datas = data.val()

            for(const dataKey in datas) {
                const photosObj = datas[dataKey]

                for(const photoKey in photosObj) {
                    const {name, url, thumb, popup, path} = photosObj[photoKey]
                    photos.push({
                        id: photoKey,
                        type: 'photo',
                        name,
                        thumb,
                        url: popup || url
                    })

                    if(firebase.auth().currentUser) {
                        if(!thumb) {
                            firebase.storage().ref('inktoberthumb/' + path).getDownloadURL().then(function (url) {
                                firebase.database().ref(`/inktober2018/${dataKey}/${photoKey}/thumb`).set(url.toString())
                            }).catch(function () {
                                console.log('no thumbnail for ', path);
                            });
                        }

                        if(!popup) {
                            firebase.storage().ref('inktober500/' + path).getDownloadURL().then(function (url) {
                                firebase.database().ref(`/inktober2018/${dataKey}/${photoKey}/popup`).set(url.toString())
                            }).catch(function () {
                                console.log('no compressed image for ', path);
                            });
                        }
                    }
                }

                photos.push({
                    id: dataKey,
                    type: 'title',
                    text: dataKey
                })
            }

            this.setState({
                images: [...photos.reverse(), ...this.state.images]
            })
        }).catch(error => {
            console.log(error.message)
        })
    }

    openPopup(popupTitle, popupImage) {
        this.setState({
            isPopupOpen: true,
            popupTitle,
            popupImage
        })
    }

    closePopup() {
        this.setState({
            isPopupOpen: false,
            popupImage: '',
            popupTitle: ''
        })
    }

    renderImages() {
        return this.state.images.map((image) => {
            switch(image.type) {
                case 'photo':
                    return <GalleryItem key={image.id} name={image.name} thumb={image.thumb || image.url} url={image.url} onClick={this.openPopup}/>
                case 'title':
                    return <GalleryTitle key={image.id} text={image.text}/>
                default:
                    return <GalleryLink key={image.id} url={image.url} link={image.link}/>
            }
        })
    }

    render() {
        return (
            <div className={style.galleryContainer}>
                {this.state.isPopupOpen && <Popup title={this.state.popupTitle} image={this.state.popupImage} close={this.closePopup}/>}
                <div className={style.gallery}>
                    <div className={style.galleryItems}>
                        {this.renderImages()}
                    </div>
                </div>
            </div>
        )
    }
}

export default GalleryContainer