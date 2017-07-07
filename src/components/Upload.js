import React from 'react'

import style from '../styles/upload.css'

export default class Upload extends React.Component {
    constructor() {
        super()

        this.state = {
            file: ''
        }
    }

    confirmUpload() {
        alert('berhasil')
    }

    cancelUpload() {
        const file = this.state.file
        URL.revokeObjectURL(file)
        this.setState({file: ''})
    }

    handleFiles(event) {
        if(event.target.files[0]) {
            const file = URL.createObjectURL(event.target.files[0])
            this.setState({file})
        } else {
            this.cancelUpload()
        }
    }

    render() {
        let bgImg = ''
        let containerState = style.uploadButtonContainer

        if(this.state.file !== '') {
            bgImg = `url(${this.state.file})`
            containerState = `${style.uploadButtonContainer} ${style.active}`
        }

        return (
            <div className={style.uploadItem}>
                <label className={style.uploadFileButton} style={{backgroundImage: bgImg}}>
                    <input type="file" className={style.uploadFileInput} onChange={this.handleFiles.bind(this)}/>
                </label>
                <div className={containerState}>
                    <button className={style.btn} onClick={this.confirmUpload.bind(this)}>&#x2713;</button>
                    <button className={style.btn} onClick={this.cancelUpload.bind(this)}>&#x2717;</button>
                </div>
            </div>
        )
    }
}