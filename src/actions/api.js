import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

import registerFirebase from '../registerFirebase'

registerFirebase()

const fbauth = firebase.auth()
const fbdatabase = firebase.database()
const fbstorage = firebase.storage()

const auth = {
    self: fbauth,
    login: () => fbauth.signInWithPopup(new firebase.auth.GoogleAuthProvider()),
    logout: () => fbauth.signOut()
}

const pictures = {
    getAll: url => fbdatabase.ref(url).once('value'),
    add: (file, path) => {
        const stringDay = (new Date()).getDate().toString().padStart(2, '0')
        const config = {cacheControl: 'public,max-age=31536000'}

        const fileExt = file.name.slice((file.name.lastIndexOf('.') - 1 >>> 0) + 1)
        const fileDbRef = fbdatabase.ref(`/${path}/${stringDay}`)
        const fileKey = fileDbRef.push().key
        const fileName = stringDay + fileKey + fileExt
        const fileRef = fbstorage.ref(`${path}/${fileName}`)

        return fileRef.put(file, config)
            .then(data => data.ref.getDownloadURL())
            .then(downloadURL => {
                return fileDbRef.child(fileKey).set({
                    name: firebase.auth().currentUser.email,
                    thumb: downloadURL,
                    popup: downloadURL
                }).then(() => ({
                    day: stringDay,
                    key: fileKey,
                    name: firebase.auth().currentUser.email,
                    thumb: downloadURL,
                    popup: downloadURL
                }))
            })
    }
}

export {
    auth,
    pictures
}
