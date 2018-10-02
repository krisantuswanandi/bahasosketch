import React from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

import Preview from './Preview'
import Loading from './Loading'

const getStringDay = param => {
    const date = param || new Date()
    const day = ('0' + date.getDate()).slice(-2)

    return day
}

const getStringDate = param => {
    const date = param || new Date()
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)

    return year + '' + month + '' + day
}

const getStringTime = param => {
    const time = param || new Date()
    const hour = ('0' + time.getHours()).slice(-2)
    const minute = ('0' + time.getMinutes()).slice(-2)
    const second = ('0' + time.getSeconds()).slice(-2)

    return hour + '' + minute + '' + second
}

const fd = 'inktober2018'

class Upload extends React.Component {
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
            const fileRef = firebase.storage().ref(`${fd}/${fileName}`)
            fileRef.put(file, {cacheControl: 'public,max-age=31536000'}).then(data => {
                return data.ref.getDownloadURL()
            }).then(downloadURL => {
                return firebase.database().ref(`/${fd}/${getStringDay()}`).push({
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
                    <label className="upload-file-button">+
                        <input ref="file" type="file" className="upload-file-input" onChange={this.handleFiles.bind(this)}/>
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
                    <button className="upload-file-button" onClick={this.props.onClick}>+</button>
                </div>
            )
        }
    }
}

export default Upload
