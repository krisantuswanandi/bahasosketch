import React from 'react'
import * as firebase from 'firebase'

import Logout from './Logout'
import Upload from './Upload'
import GalleryContainer from './GalleryContainer'
import {getThemeID} from '../utils/functions'

export default class Home extends React.Component {
    constructor() {
        super()

        this.dayCounter = 1
        this.dbRef = firebase.database().ref('/themes_photos')
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
                const themeRef = firebase.database().ref('/themes/' + data.key)
                themeRef.once('value').then(data => {
                    const title = `DAY ${this.dayCounter++}`
                    const theme = `#${data.val()}`
                    const photos = []

                    Object.keys(photosObj).forEach(key => {
                        const {name, url} = photosObj[key]
                        photos.push({name, url})
                    })
                    photos.reverse()

                    this.setState({
                        items: [{title, theme, photos}, ...this.state.items]
                    })
                })
            }
        })

        this.todayRef.on('child_added', data => {
            const {name, url} = data.val()

            this.setState({
                todays: [{name, url}, ...this.state.todays]
            })
        })

        /*TODO: sample JSON*/
        /*const items = []
        for(let i = 0; i < 9; i++) {
            const title = `DAY ${i+1}`
            const theme = '#RANDOMTHEME'
            const photos = []

            for(let j = 0; j < 3; j++) {
                photos.push({name: 'krisantus@bahaso.com', url: 'https://lorempixel.com/200/200'})
            }

            items.push({title, theme, photos})
        }
        items.reverse()

        this.setState({items})*/
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