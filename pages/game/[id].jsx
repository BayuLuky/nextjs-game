import React, { useEffect, useState } from "react";
import Head from "next/head";
import APIRequest from "../../components/library/request/apiRequest";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'next/image';

import rpsImg from '../../public/assets/rockpaperstrategy-1600.jpg'

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
			<Container>
			<Row>
				<Col>
					<h2 className="sr-only">{detail.name}</h2>
					<h5 className="sr-only">{detail.description}</h5>
					<Button className="mt-5" variant="primary" size="md">Play the Game</Button>
				</Col>
				<Col>
					<Image variant="top" src={rpsImg} alt="image-card" />
				</Col>
			</Row>
			</Container>
        </React.Fragment>
    )
}

export default DetailGames