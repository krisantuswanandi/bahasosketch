import firebase from 'firebase/app'

const apiKey = process.env.REACT_APP_API_KEY
const projectId = process.env.REACT_APP_PROJECT_NAME
const authDomain = `${projectId}.firebaseapp.com`
const databaseURL = `https://${projectId}.firebaseio.com`
const storageBucket = `${projectId}.appspot.com`

const registerFirebase = () => firebase.initializeApp({
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket
})

export default registerFirebase
