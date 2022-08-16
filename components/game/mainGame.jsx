import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import APIRequest from '../../components/library/request/apiRequest'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import rpsImg from '../../public/assets/rockpaperstrategy-1600.jpg'

import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => ({
	stateObject: state
}) 

const MainGame = (props) => {
	const API = `${process.env.NEXT_PUBLIC_APIURL}game`
	const [games, setGames] = useState([])
  const dataUser = props.stateObject.user !== 'undefined' ? props.stateObject.user : {}

  const getGame = () => {
		APIRequest('GET', API)
		.then(response => {
			const data_game = response.data
			// console.log(data_game)
      setGames(data_game)
		})
		.catch(err => {
			console.log('err', err)
		})
	}

  useEffect(()=> {
    return getGame()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1 className="sr-only">Page Game</h1>
      <CardGroup>
        {games.map((game, idx) => ( 
          <Card key={`keyGames-${idx}`} className="me-4">

            {dataUser ? 
              (
                <Link href={`${process.env.NEXT_PUBLIC_BASEURL}game/${game.id}`}>
                  <div>
                    <Image variant="top" src={rpsImg} alt="image-card" />
                    <Card.Body>
                      <Card.Title>{game.name}</Card.Title>
                      <Card.Text>
                        {game.description}
                      </Card.Text>
                    </Card.Body>
                  </div>
                </Link>
              )
            : 
              (
                <Link href={`${process.env.NEXT_PUBLIC_BASEURL}login`}>
                  <div>
                    <Image variant="top" src={rpsImg} alt="image-card" />
                    <Card.Body>
                      <Card.Title>{game.name}</Card.Title>
                      <Card.Text>
                        {game.description}
                      </Card.Text>
                    </Card.Body>
                  </div>
                </Link>
              )
            }
          </Card>
        ))}
      </CardGroup>
    </div>
  );
};

export default connect(mapStateToProps)(MainGame);