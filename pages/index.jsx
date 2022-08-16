import React, { useEffect, useState } from "react"
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import styles from '../styles/Home.module.css'


const Home = (props) => {

	return (
		<React.Fragment>
			<Head>
				<title>Binar Chapter 10</title>
			</Head>

			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-screen-2xl lg:px-8">
				<h1 className="sr-only">Page title</h1>

			</div>
		</React.Fragment>
	)
}

export default Home
