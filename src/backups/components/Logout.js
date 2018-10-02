import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

import style from '../../styles/form.css'

const Logout = () => {
    return (
        <button className={`${style.btn} ${style.btnBlock} ${style.btnPrimary}`} onClick={() => { firebase.auth().signOut() }}
                style={{width: '250px', margin: '-30px auto'}}>LOGOUT</button>
    )
}

export default Logout