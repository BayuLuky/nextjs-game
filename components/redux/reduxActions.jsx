const setUser = (dataUser) => ({
    type: "set/user",
    user: dataUser
})

const setToken = (accessToken) => ({
    type: "set/token",
    accessToken: accessToken
})

const setLogging = (loggedIn) => ({
    type: "set/islogging",
    loggedIn: loggedIn
})

const reset = () => ({
    type: "clearstate"
})

export {setUser, setToken, setLogging, reset}