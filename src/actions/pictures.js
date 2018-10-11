import * as api from './api'

const getPictures = url => dispatch => api.pictures.getAll(url).then(data => {
    dispatch({
        type: 'FETCH_PICTURES',
        payload: data.val()
    })
})

const addPicture = (file, path) => dispatch => api.pictures.add(file, path).then(data => {
    dispatch({
        type: 'ADD_PICTURE',
        payload: data
    })
})

export default {
    getPictures,
    addPicture
}
