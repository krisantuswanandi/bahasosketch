import {combineReducers} from 'redux'
import user from './user'
import pictures from './pictures'

const reducer = combineReducers({
    user,
    pictures
})

export default reducer
