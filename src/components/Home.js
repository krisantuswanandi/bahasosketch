import React from 'react'
import * as firebase from 'firebase'

import Logout from './Logout'
import GalleryContainer from './GalleryContainer'
import {getThemeID, getThemeDay} from '../utils/functions'

export default class Home extends React.Component {
    constructor() {
        super()

        this.dbRef = firebase.database().ref('/themes_photos').limitToLast(7)
        this.todayRef = firebase.database().ref(`/themes_photos/${getThemeID()}`)
        this.state = {
            todays: [],
            items: []
        }
    }

    componentWillMount() {
        this.dbRef.on('child_added', data => {
            if(data.key !== getThemeID()) {
                const photosObj = data.val()
                const themeDay = getThemeDay(data.key)
                const themeRef = firebase.database().ref('/themes/' + data.key)
                themeRef.once('value').then(data => {
                    const title = `DAY ${themeDay}`
                    const theme = `#${data.val()}`
                    const photos = []

                    Object.keys(photosObj).forEach(key => {
                        const {name, path, url} = photosObj[key]
                        photos.push({name, path, url})
                    })
                    photos.reverse()

                    this.setState({
                        items: [{title, theme, photos}, ...this.state.items]
                    })
                })
            }
        })

        this.todayRef.on('child_added', data => {
            const {name, path, url} = data.val()

            this.setState({
                todays: [{name, path, url}, ...this.state.todays]
            })
        })
    }

    componentWillUnmount() {
        this.dbRef.off()
        this.todayRef.off()
    }

    render() {
        const todays = [
            { photos: this.state.todays }
        ]

        return (
            <div>
                <Logout/>
                <GalleryContainer data={todays} upload={true}/>
                <GalleryContainer data={this.state.items}/>
            </div>
        )
    }
}