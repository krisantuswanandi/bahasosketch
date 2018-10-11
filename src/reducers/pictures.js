const pictures = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_PICTURES':
            return action.payload
        case 'ADD_PICTURE':
            const {day, key, name, thumb, popup} = action.payload
            return {
                ...state,
                [day]: {
                    ...state[day],
                    [key]: {name, thumb, popup}
                }
            }
        default:
            return state
    }
}

export default pictures
