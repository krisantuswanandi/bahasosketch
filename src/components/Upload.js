import React from 'react'
import * as firebase from 'firebase'

import {getStringDate, getStringTime, getThemeID} from '../utils/functions'
import style from '../styles/upload.css'
import styleBtn from '../styles/form.css'

export default class Upload extends React.Component {
    constructor() {
        super()

        this.state = {
            file: null,
            imgPreview: '',
            uploading: false
        }
    }

    confirmUpload() {
        if(this.state.file) {
            const file = this.state.file
            const fileExt = file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 1)
            const fileName = 'images/' + getStringDate() + getStringTime() + fileExt

            this.setState({uploading: true})
            const fileRef = firebase.storage().ref(fileName)
            fileRef.put(file, {cacheControl: 'public,max-age=31536000'}).then(data => {
                const newPostKey = firebase.database().ref('/photos').push().key
                const newPost = {
                    name: firebase.auth().currentUser.email,
                    url: data.metadata.downloadURLs[0],
                    path: data.metadata.fullPath
                }

                let updates = {}
                updates['/photos/' + newPostKey] = newPost
                updates['/themes_photos/' + getThemeID() + '/' + newPostKey] = newPost

                return firebase.database().ref().update(updates)
            }).then(() => {
                this.clearUpload()
            }).catch((error) => {
                console.log(error)
                alert('Connection error!')
                this.clearUpload()
            })
        }
    }

    clearUpload() {
        const imgPreview = this.state.imgPreview
        URL.revokeObjectURL(imgPreview)
        
        this.refs.file.value = ''
        this.setState({
            imgPreview: '',
            file: null,
            uploading: false
        })
    }

    handleFiles(event) {
        if(event.target.files[0]) {
            const imgPreview = URL.createObjectURL(event.target.files[0])
            this.setState({
                imgPreview,
                file: event.target.files[0]
            })
        }
    }

    render() {
        let bgImg = ''
        let containerState = style.uploadButtonContainer

        if(this.state.imgPreview !== '') {
            bgImg = `url(${this.state.imgPreview})`
            containerState = `${style.uploadButtonContainer} ${style.active}`
        }

        return (
            <div className={style.uploadItem}>
                <label className={style.uploadFileButton} style={{backgroundImage: bgImg}}>
                    <input ref="file" type="file" className={style.uploadFileInput} onChange={this.handleFiles.bind(this)}/>
                </label>
                <div className={containerState}>
                    <button className={`${styleBtn.btn} ${styleBtn.btnPrimary}`} disabled={this.state.uploading} onClick={this.confirmUpload.bind(this)}>Upload</button>
                    <button className={`${styleBtn.btn} ${styleBtn.btnPrimary}`} disabled={this.state.uploading} onClick={this.clearUpload.bind(this)}>Cancel</button>
                </div>
            </div>
        )
    }
}