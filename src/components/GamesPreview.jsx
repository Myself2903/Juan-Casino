import '../styles/GamesPreview.css'
import poker from '../assets/poker.jpg'
import slots from '../assets/slots.jpg'
import blackjack from '../assets/blackjack.jpg'
import roulette from '../assets/roulette.jpg'
import Modal from './Modal.jsx'
import { useState } from 'react'


const GamesPreview = ()=>{

    const [modalShow, setModalShow] = useState(false);
    const [modelParams, setModelParams] = useState([]); 

    const manageShowModal = (game, description) =>{
        setModelParams({'game': game, 'content': description})
        setModalShow(true)        
    }

    return (
        <section id="games_preview">
            <h1>Lista de juegos</h1>
            <div id="game_selector">
            <ul id="game_list">
                <li>
                    <div className='game' onClick={()=> manageShowModal("Póker", "Crea la mejor combinación de 5 cartas para ganar. 2 - 4 jugadores. Se necesitan mínimo 25 fichas para jugar.")}>
                        <img alt="poker" src={poker}></img><br />
                        <span>Poker</span>
                    </div>
                </li>
                        
                <li>
                    <div className='game' onClick={()=> manageShowModal("Tragamonedas", "Consigue una de las combinaciones posibles para ganar fichas. 1 jugador. Se necesitan mínimo 2 fichas para jugar.")}>
                        <img alt="tragamonedas" src={slots}></img><br />
                        <span>Tragamonedas</span>
                    </div>
                </li>

                <li>
                    <div className='game' onClick={()=> manageShowModal("Blackjack", "Intenta acercarte lo más posible hasta el 21 sin pasarte. 2 - 4 jugadores. Se necesitan mínimo 25 fichas para jugar.")}>
                        <img alt="blackjack" src={blackjack}></img><br />
                        <span>Blackjack</span>  
                    </div>
                </li>

                <li>
                    <div className='game' onClick={()=> manageShowModal("Ruleta", "Atina la posición en la que se detiene la ruleta para multiplicar tu apuesta. 1 - 4 jugadores. Se necesitan mínimo 5 fichas para jugar.")}>
                        <img alt="ruleta" src={roulette}></img><br />
                        <span>Ruleta</span>  
                    </div>
                </li>
            </ul>

            <a>Registrate</a>
            </div>
            <Modal show={modalShow} onClose={()=> setModalShow(false)} params={modelParams} />
        </section>
    );
}

export default GamesPreview;