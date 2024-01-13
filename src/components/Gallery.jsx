import React from 'react'
import {connect} from 'react-redux'

import GalleryItem from './GalleryItem'
import GalleryTitle from './GalleryTitle'
import GalleryLink from './GalleryLink'
import Popup from './Popup'
import {pictures} from '../actions'

class GalleryContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isPopupOpen: false,
            popupImage: '',
            popupTitle: ''
        }

        this.openPopup = this.openPopup.bind(this)
        this.closePopup = this.closePopup.bind(this)
    }

    componentDidMount() {
        this.props.loadData('/inktober2018')
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

    renderPictures() {
        const result = []
        const {pictures} = this.props

        result.push(<GalleryLink key="intro" link="https://www.instagram.com/p/BnT1LhRgard/" url="https://scontent-sit4-1.cdninstagram.com/vp/4c84bbb0f608fc3eead1606ad2703750/5C56766E/t51.2885-15/e35/40432064_560631531021277_1406291162821026460_n.jpg"/>)
        result.push(<GalleryLink key="themes" link="https://www.instagram.com/p/BnL2dxfg8Uq/" url="https://scontent-sit4-1.cdninstagram.com/vp/59f6ee7e0f9cbb3fc8606ac72b4e91c5/5C4330DC/t51.2885-15/e35/39815925_407430529786848_2695135490553675776_n.jpg"/>)
        Object.keys(pictures).sort().forEach(picturessKey => {
            const picturess = pictures[picturessKey]

            Object.keys(picturess).forEach(pictureKey => {
                const picture = picturess[pictureKey]

                result.push(<GalleryItem key={pictureKey} name={picture.name} thumb={picture.thumb} url={picture.popup} onClick={this.openPopup}/>)
            })

            result.push(<GalleryTitle key={picturessKey} text={picturessKey}/>)
        })

        return result.reverse()
    }

    render() {
        return (
            <div className="gallery-container">
                {this.state.isPopupOpen && <Popup title={this.state.popupTitle} image={this.state.popupImage} close={this.closePopup}/>}
                <div className="gallery">
                    <div className="gallery-items">
                        {this.renderPictures()}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(({pictures}) => ({
    pictures
}), {loadData: pictures.getPictures})(GalleryContainer)
