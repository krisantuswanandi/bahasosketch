import React from 'react'
import * as firebase from 'firebase'

import style from '../styles/form.css'

const Logout = () => {
    return (
        <button className={`${style.btn} ${style.btnBlock} ${style.btnPrimary}`} onClick={() => { firebase.auth().signOut() }}
                style={{width: '250px', margin: '-30px auto'}}>LOGOUT</button>
    )
}

export default Logout