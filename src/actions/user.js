import * as api from './api'

const onAuth = () => dispatch => {
    api.auth.self.onAuthStateChanged(user => {
        if(user) {
            const {displayName, email, photoURL, uid} = user

            dispatch({
                type: 'LOGIN',
                payload: {
                    uid,
                    email,
                    displayName,
                    photoURL
                }
            })
        } else {
            dispatch({
                type: 'LOGOUT',
            })
        }
    })
}

const login = () => dispatch => api.auth.login()

const logout = () => dispatch => api.auth.logout()

export default {
    onAuth,
    login,
    logout
}
