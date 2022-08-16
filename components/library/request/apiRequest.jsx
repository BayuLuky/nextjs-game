import axios from "axios";
import store from "./../../redux/reduxStore";
import ReduxReducers from "../../redux/reduxReducers";

const APIRequest = (
    method, 
    url, 
    data = {}, 
    options = {},
    isAbort = false) => {

    const dataRedux = store.getState()
    const abortController = new AbortController()

    options.Accept = 'application/json'
    options['Access-Control-Allow-Credentials'] = true

    if(typeof options.Authorization === 'undefined') {
        options.Authorization = `Bearer ${dataRedux.accessToken}`
    }

    let configs = {
        method: method,
        url: url,
        headers: options,
        signal: abortController.signal
    }
    
    if('get' === method.toLowerCase()) configs.params = data
    else configs.data = data
    
    if(isAbort) {
        abortController.abort()
    }
    
    return axios(configs)
    .then(response => {
        return response.data
    })
    .catch(async (err) => {
        console.log('err api', err)
        switch (err.response.status) {
            case 401:
                store.dispatch({
                    type: 'set/islogging',
                    loggedIn: false
                })
                break;

            default:
                let throwErr = { data: {} }
                if(err.response.data) {
                    throwErr.data = err.response.data
                }
                throwErr.data.status = err.response.status
                throw throwErr
                break;
        }

    })

}

export default APIRequest