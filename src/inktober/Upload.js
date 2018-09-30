import React from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

import Preview from './Preview'
import Loading from './Loading'

import {getStringDay, getStringDate, getStringTime} from '../utils/functions'
import style from '../styles/upload.css'

export default class Upload extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            file: null,
            imgPreview: '',
            uploading: false
        }
    }

    confirmUpload() {
        if(this.state.file) {
            const file = this.state.file
            const fileExt = file.name.slice((file.name.lastIndexOf('.') - 1 >>> 0) + 1)
            const fileName = getStringDate() + getStringTime() + fileExt

            this.setState({uploading: true})
            const fileRef = firebase.storage().ref(`inktober2018/${fileName}`)
            fileRef.put(file, {cacheControl: 'public,max-age=31536000'}).then(data => {
                return data.ref.getDownloadURL()
            }).then(downloadURL => {
                return firebase.database().ref('/inktober2018/' + getStringDay()).push({
                    name: firebase.auth().currentUser.email,
                    url: downloadURL,
                    path: fileName
                })
            }).then(() => {
                window.location.replace('/')
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
        if(this.props.canUpload) {
            return (
                <div>
                    <label className={style.uploadFileButton}>+
                        <input ref="file" type="file" className={style.uploadFileInput} onChange={this.handleFiles.bind(this)}/>
                    </label>
                    {this.state.imgPreview && <Preview
                        image={this.state.imgPreview}
                        onConfirm={this.confirmUpload.bind(this)}
                        onCancel={this.clearUpload.bind(this)}/>}
                    {this.state.uploading && <Loading/>}
                </div>
            )
        } else {
            return (
                <div>
                    <button className={style.uploadFileButton} onClick={this.props.onClick}>+</button>
                </div>
            )
        }
    }
}