const ReduxReducers = (state = {}, action) => {

    // console.log('Reducers', action)

    switch (action.type) {
        case 'set/user':
            return {...state, user: action.user}
        case 'set/token':
            return {...state, accessToken: action.accessToken}
        case 'set/islogging':
            return {...state, loggedIn: action.loggedIn}
        case 'clearstate':
            return {undefined}
        default:
            return state
    }
}

export default ReduxReducers