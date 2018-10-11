import firebase from 'firebase/app'

const isProd = () => (process.env.NODE_ENV === 'production')

const apiKey = isProd() ? process.env.REACT_APP_API_KEY : process.env.REACT_APP_API_KEY_DEV
const projectId = isProd() ? process.env.REACT_APP_PROJECT_NAME : process.env.REACT_APP_PROJECT_NAME_DEV
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
