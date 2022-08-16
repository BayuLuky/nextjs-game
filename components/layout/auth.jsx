import React from "react";
import { connect } from "react-redux";
import Head from "next/head";
import LoginForm from "./../auth/login";
import { setUser, setToken, setLogging, reset } from "../redux/reduxActions";

const mapStateToProps = (state, ownProps) => ({
    stateObject: state
}) 

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => {
        dispatch(setUser(user))
    },
    setToken: (accessToken) => {
        dispatch(setToken(accessToken))
    },
    setLogging: (loggedIn) => {
        dispatch(setLogging(loggedIn))
    },
    reset: () => {
        dispatch(reset())
    }
})
class AuthLayout extends React.Component {

    setReduxStore = (user, token, loggedIn) => {
        this.props.setUser(user)
        this.props.setToken(token)
        this.props.setLogging(loggedIn)

        // this.props.updateStatusLogin(true)
    }

    render() {
        const {loading} = this.props
        return (
            <React.Fragment>
                <Head>                
                    <meta charSet="utf-8" />
                    <link rel="shortcut icon" href={`${process.env.NEXT_PUBLIC_BASEURL}assets/media/logos/favicon.ico`} />
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />                    
                    {/* <link href={`${process.env.NEXT_PUBLIC_BASEURL}assets/plugins/global/plugins.bundle.css`} rel="stylesheet" type="text/css" />
                    <link href={`${process.env.NEXT_PUBLIC_BASEURL}assets/css/style.bundle.css`} rel="stylesheet" type="text/css" />
                    <link href={`${process.env.NEXT_PUBLIC_BASEURL}assets/css/style.custom.css`} rel="stylesheet" type="text/css" /> */}

                    <title>Game</title>
                </Head>
                
                    <div className="d-flex flex-column flex-root">
                        <div 
                            className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed">
                            
                            <LoginForm setReduxStore={this.setReduxStore} />
                        </div>
                    </div>
                
            </React.Fragment>
        )
    }
}

AuthLayout = connect(mapStateToProps, mapDispatchToProps)(AuthLayout)
export default AuthLayout