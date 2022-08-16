import React, { useEffect, useState } from "react";
import Head from "next/head";
import APIRequest from "../../components/library/request/apiRequest";

import { useRouter } from "next/router";

const DetailGames = (props) => {
    
	const router = useRouter()
	const routes = router.query
    const API = `${process.env.NEXT_PUBLIC_APIURL}game/${routes.id}`
    
	const [detail, setDetail] = useState([])

	const getDetailGames = () => {
		APIRequest('GET', API)
		.then(response => {
            let data = response.data
			setDetail(data)
		})
		.catch(err => {
			console.log('err', err)
		})
	}

	useEffect(() => {
        if(typeof routes.id !== 'undefined') {
            getDetailGames()
        }
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [routes])

    return (
        <React.Fragment>
            <Head>
                <title>{detail.name !== undefined ? detail.name : 'Binar Academy'}</title>
            </Head>
            <h1 className="sr-only">{detail.name}</h1>
            <h1 className="sr-only">{detail.description}</h1>
        </React.Fragment>
    )
}

export default DetailGames