import React from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

import style from '../styles/gallery.css'

export default class GalleryItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            url: ''
        }
    }

    componentWillMount() {
        const {photo: {id, date, path, url, thumb}} = this.props

        if(thumb) {
            this.setState({url: thumb})
        } else {
            const thumbRef = firebase.storage().ref('popup/' + path)
            thumbRef.getDownloadURL().then(url => {
                this.setState({url})

                if(date) {
                    thumbRef.updateMetadata({cacheControl: 'public,max-age=31536000'}).then(meta => {
                        const url = meta.downloadURLs[0]

                        let updates = {}
                        updates[`/photos/${id}/image`] = url
                        updates[`/themes_photos/${date}/${id}/image`] = url

                        firebase.database().ref().update(updates)
                    })
                }
            }).catch(error => {
                this.setState({url})
            })
        }
    }

    render() {
        const {photo: {name, path}, click} = this.props

        return (
            <div className={style.galleryItem}>
                <div className={style.galleryImage} style={{backgroundImage: `url(${this.state.url})`}} onClick={() => { click(name, path) }}></div>
            </div>
        )
    }
}