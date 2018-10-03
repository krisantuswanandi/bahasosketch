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
            const db = firebase.database()
            const storage = firebase.storage()
            const stringDay = getStringDay()
            const config = {cacheControl: 'public,max-age=31536000'}

            const file = this.state.file
            const fileExt = file.name.slice((file.name.lastIndexOf('.') - 1 >>> 0) + 1)
            const fileDbRef = db.ref(`/${fd}/${stringDay}`)
            const fileKey = fileDbRef.push().key
            const fileName = stringDay + fileKey + fileExt
            const fileRef = storage.ref(`${fd}/${fileName}`)

            this.setState({uploading: true})
            fileRef.put(file, config)
                .then(data => data.ref.getDownloadURL())
                .then(downloadURL => fileDbRef.child(fileKey).set({
                    name: firebase.auth().currentUser.email,
                    popup: downloadURL
                }))
                .then(() => {
                    window.location.replace('/')
                })
                .catch(error => {
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
