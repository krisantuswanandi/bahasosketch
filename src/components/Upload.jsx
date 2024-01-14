import React from 'react'
import {connect} from 'react-redux'

import Preview from './Preview'
import Loading from './Loading'
import {pictures} from '../actions'

class Upload extends React.Component {
    state = {
        file: null,
        imgPreview: '',
        uploading: false
    }

    confirmUpload() {
        if(this.state.file) {
            this.setState({uploading: true})
            this.props.upload(this.state.file, 'inktober2018').catch(() => {
                alert('Something wrong, please try again!')
            }).then(() => {
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
        return (
            <div>
                <label className="rounded-full fixed right-10 bottom-10 w-16 h-16 text-4xl leading-none bg-neutral-900 text-neutral-100 flex justify-center items-center">+
                    <input ref="file" type="file" className="hidden" onChange={this.handleFiles.bind(this)}/>
                </label>
                {this.state.imgPreview && <Preview
                    image={this.state.imgPreview}
                    onConfirm={this.confirmUpload.bind(this)}
                    onCancel={this.clearUpload.bind(this)}/>}
                {this.state.uploading && <Loading/>}
            </div>
        )
    }
}

export default connect(null, {upload: pictures.addPicture})(Upload)
