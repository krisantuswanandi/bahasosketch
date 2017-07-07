import React from 'react'
import * as firebase from 'firebase'

import LoginForm from './LoginForm'
import GalleryContainer from './GalleryContainer'

export default class Login extends React.Component {
    constructor() {
        super()

        this.dbRef = firebase.database().ref('/photos').limitToLast(18)
        this.state = {
            photos: []
        }
    }

    componentWillMount() {
        this.dbRef.on('child_added', data => {
            const {url} = data.val()

            this.setState({
                photos: [{url}, ...this.state.photos]
            })
        })

        /*TODO: sample JSON*/
        /*for(let i = 0; i < 9; i++) {
            this.setState({
                photos: [{url: 'https://lorempixel/200/200'}, ...this.state.photos]
            })
        }*/
    }

    componentWillUnmount() {
        this.dbRef.off()
    }

    render() {
        const explore = [
            {
                theme: '#EXPLORE',
                photos: this.state.photos
            }
        ]

        return (
            <div>
                <LoginForm/>
                <GalleryContainer data={explore}/>
            </div>
        )
    }
}