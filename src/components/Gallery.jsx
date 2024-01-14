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

        result.push(<GalleryLink key="intro" link="https://www.instagram.com/p/BnT1LhRgard/" url="https://images.squarespace-cdn.com/content/v1/5af1bd791aef1d143f85e67e/ee774b75-e4fd-4928-8dd7-834bbefb5ee7/2018promptlist.jpeg?format=1000w"/>)
        result.push(<GalleryLink key="themes" link="https://www.instagram.com/p/BnL2dxfg8Uq/" url="https://images.squarespace-cdn.com/content/v1/5af1bd791aef1d143f85e67e/ee774b75-e4fd-4928-8dd7-834bbefb5ee7/2018promptlist.jpeg?format=1000w"/>)
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
            <>
                {this.state.isPopupOpen && <Popup title={this.state.popupTitle} image={this.state.popupImage} close={this.closePopup}/>}
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                        {this.renderPictures()}
                    </div>
            </>
        )
    }
}

export default connect(({pictures}) => ({
    pictures
}), {loadData: pictures.getPictures})(GalleryContainer)
