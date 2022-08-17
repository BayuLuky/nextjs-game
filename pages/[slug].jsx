import React, { useEffect } from "react";
import MainHome from "../components/home/mainHome";
import MainAbout from "../components/about/mainAbout";
import MainGame from "../components/game/mainGame";
import MainContact from "../components/contact/mainContact"
import MainLogin from "../components/layout/auth"
import MainRegistrasi from "../components/auth/register"
import MainProfile from "../components/profile/mainProfile"

import { useRouter } from "next/router";

const Menu = (props) => {

	const router = useRouter()
	const onPage = router.query.slug

	switch (onPage) {
		case 'home':
			return <MainHome onPage={onPage}/>
        
		case 'about':
			return <MainAbout onPage={onPage}/>

		case 'game':
			return <MainGame onPage={onPage}/>

		case 'contact':
			return <MainContact onPage={onPage}/>

		case 'login':
			return <MainLogin onPage={onPage}/>

		case 'registrasi':
			return <MainRegistrasi onPage={onPage}/>

		case 'profile':
			return <MainProfile onPage={onPage}/>

		default:
			return <section>Loading....</section>	
	}
}

export default Menu