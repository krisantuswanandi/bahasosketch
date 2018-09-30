import React from 'react'
import firebase from 'firebase/app'
import 'firebase/database'

import GalleryContainer from './GalleryContainer'
import {getThemeDay, getThemeIDFrom} from '../utils/functions'

import style from '../styles/form.css'

export default class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            lastItem: '20170831',
            isLoading: false
        }

        this.loadItem = this.loadItem.bind(this)
    }

    componentWillMount() {
        this.loadItem()
    }

    loadItem() {
        const countItem = 5
        this.setState({isLoading: true})

        let lastItem = null
        let themes_photos = {}
        const dbRef = firebase.database().ref('/themes_photos').orderByKey().endAt(this.state.lastItem).limitToLast(countItem)
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
                const date = item.key
                const photosObj = themes_photos[date]
                const themeDay = getThemeDay(date)

                if(!lastItem) lastItem = date
                this.themeDay = themeDay

                const title = `DAY ${themeDay}`
                const theme = `#${item.val()}`
                const photos = []

                for(const key in photosObj) {
                    const {name, image} = photosObj[key]
                    photos.push({id: key, name, date, image})
                }
                photos.reverse()

                items.push({title, theme, photos})
            })

            this.setState({
                items: [...this.state.items, ...items.reverse()],
                isLoading: false,
                lastItem: getThemeIDFrom(lastItem, 1)
            })
        }).catch(error => {
            console.log(error.message)
            this.setState({isLoading: false})
        })
    }

    render() {
        return (
            <div>
                <GalleryContainer data={this.state.items}/>
                <div style={{width: '250px', margin: '40px auto', textAlign: 'center'}}>
                    {this.themeDay === 1 ? <div>:)</div> : (this.state.isLoading ? 'Loading...' : <button className={`${style.btn} ${style.btnBlock} ${style.btnPrimary}`} onClick={this.loadItem}>Load more</button>)}
                </div>
            </div>
        )
    }
}