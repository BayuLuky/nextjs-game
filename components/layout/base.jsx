import React from "react";
import Head from "next/head";

import NavBar from "./partials/navbar";
import Footer from "./partials/footer";
import axios from "axios";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import { setUser, setToken, setRole, setLogging, reset } from "../redux/reduxActions";

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
    setRole: (role) => {
        dispatch(setRole(role))
    },
    setLogging: (loggedIn) => {
        dispatch(setLogging(loggedIn))
    },
    reset: () => {
        dispatch(reset())
    }
})

class BaseLayout extends React.Component {
    state = {
        isLogOut: false
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.dataLogIn !== this.props.dataLogIn) {
            const data = this.props.dataLogIn
            if(data) {
                this.props.setUser(data.user)
                this.props.setRole(data.roles)
                this.props.setToken(data.accessToken)
                this.props.setLogging(data.loggedIn)
            }
        }
        if(prevProps.stateObject.loggedIn !== this.props.stateObject.loggedIn && !this.props.stateObject.loggedIn) {
            console.log('logIn', this.props.stateObject.loggedIn)
            window.localStorage.removeItem('game_identifier')
            this.props.reset()
            this.props.updateStatusLogin(false)
        }
    }

    triggerLogout = () => {
		Swal.fire({
			text: "Anda akan keluar dari aplikasi",
            icon: "warning",
            buttonsStyling: false,
            showCancelButton: true,
            confirmButtonText: "Keluar!",
            cancelButtonText: 'Tidak, batalkan',
            customClass: {
                confirmButton: "btn btn-danger",
                cancelButton: 'btn btn-secondary'
            }
		}).then((result) => {
			if(result.isConfirmed) {
				this.setState({isLogOut: true}, () => {
                    axios({
                        url: `${process.env.NEXT_PUBLIC_APIURL}logout`,
                        method: 'POST',
                        headers: { 
                            'Accept' : 'application/json',
                            'Access-Control-Allow-Credentials' : true,
                            'Authorization' : `Bearer ${this.props.stateObject.accessToken}`
                        }
                    }).then(response => {
                        window.localStorage.removeItem('req_identifier')
                        this.props.reset()
                        this.props.updateStatusLogin(false)
                    }).catch(error => {
                        console.log('error', error)
                        const statusCode = error.response.status
                        switch (statusCode) {
                            case 401:
                                window.localStorage.removeItem('req_identifier')
                                this.props.reset()
                                this.props.updateStatusLogin(false)
                                break;
                        }
                    })
				})
			}
		})
    }

    render() {
        const {isLogOut} = this.state
        const {children, loading} = this.props
        return (
            <React.Fragment>
                <Head>
                    <link rel="icon" href="/assets/media/logo/favicon.ico" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&family=Source+Serif+Pro:wght@300;400;600;700&display=swap" rel="stylesheet" /> 
                </Head>

                <NavBar />
                
                {/* <Example /> */}
                
                <main className="my-10 pb-8 ">
                    {children}
                </main>
                
                <Footer />
            </React.Fragment>
        )
    }
}

BaseLayout = connect(mapStateToProps, mapDispatchToProps)(BaseLayout)
export default BaseLayout