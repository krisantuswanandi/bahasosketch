import React from 'react'
import * as firebase from 'firebase'

import Logout from './Logout'
import GalleryContainer from './GalleryContainer'
import {getThemeID, getThemeDay, getThemeIDFrom} from '../utils/functions'

import style from '../styles/form.css'

export default class Home extends React.Component {
    constructor() {
        super()

        this.todayRef = firebase.database().ref(`/themes_photos/${getThemeID()}`)
        this.state = {
            todays: [],
            items: [],
            lastItem: 1,
            isLoading: false
        }

        this.loadItem = this.loadItem.bind(this)
    }

    componentWillMount() {
        this.loadItem()

        this.todayRef.on('child_added', data => {
            const {name, path, url} = data.val()

            this.setState({
                todays: [{name, path, url}, ...this.state.todays]
            })
        })
    }

    componentWillUnmount() {
        this.todayRef.off()
    }

    loadItem() {
        const lastItem = this.state.lastItem
        const countItem = 3
        this.setState({isLoading: true})

        let themes_photos = {}
        const dbRef = firebase.database().ref('/themes_photos').orderByKey().endAt(getThemeIDFrom(lastItem)).limitToLast(countItem)
        dbRef.once('value').then(data => {
            themes_photos = data.val()

            const themesPromise = []
            for(const key in themes_photos) {
                const themeRef = firebase.database().ref('/themes/' + key)
                themesPromise.push(themeRef.once('value'))
            }

            return Promise.all(themesPromise)
        }).then(data => {
            const items = []
            data.forEach(item => {
                const photosObj = themes_photos[item.key]
                const themeDay = getThemeDay(item.key)

                const title = `DAY ${themeDay}`
                const theme = `#${item.val()}`
                const photos = []

                for(const key in photosObj) {
                    const {name, path, url} = photosObj[key]
                    photos.push({name, path, url})
                }
                photos.reverse()

                items.push({title, theme, photos})
            })

            this.setState({
                items: [...this.state.items, ...items.reverse()],
                lastItem: lastItem + countItem,
                isLoading: false
            })
        }).catch(error => {
            console.log(error.message)
            this.setState({isLoading: false})
        })
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
                <div style={{width: '250px', margin: '40px auto', textAlign: 'center'}}>
                    {this.state.isLoading ? 'Loading...' : <button className={`${style.btn} ${style.btnBlock} ${style.btnPrimary}`} onClick={this.loadItem}>Load more</button>}
                </div>
            </div>
        )
    }
}