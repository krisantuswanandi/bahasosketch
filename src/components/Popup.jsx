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
            <div className="popup" onClick={() => {this.props.close()}}>
                <div className="popup-dialog" onClick={(event) => {event.stopPropagation()}}>
                    <div className="popup-header">
                        <span className="popup-title">{this.props.title}&nbsp;</span>
                        <span className="popup-close" onClick={() => {this.props.close()}}>X</span>
                    </div>
                    <div className="popup-body">
                        {this.props.image === '' ? <div className="popup-loading">Loading...</div> : <img src={this.props.image} alt={this.props.title} className="popup-image"/>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Popup
