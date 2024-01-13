import React from 'react'

class Popup extends React.Component {
    componentWillMount() {
        document.body.style.overflow = 'hidden'
    }

    componentWillUnmount() {
        document.body.style.overflow = 'auto'
    }

    render() {
        return (
            <div className="preview-container">
                <div className="preview-image" style={{backgroundImage: `url(${this.props.image})`}}></div>
                <div className="preview-button">
                    <button className="confirm-button" onClick={this.props.onConfirm}>Upload</button>
                    <div className="cancel" onClick={this.props.onCancel}>Cancel</div>
                </div>
            </div>
        )
    }
}

export default Popup
