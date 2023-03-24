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

    const manageShowModal = game =>{
        setModelParams({'game': game})
        setModalShow(true)        
    }

    return (
        <section id="games_preview">
            <h1>Lista de juegos</h1>
            <div id="game_selector">
            <ul id="game_list">
                <li>
                    <div className='game' onClick={()=> manageShowModal("Poker")}>
                        <img alt="poker" src={poker}></img><br />
                        <span>Poker</span>
                    </div>
                </li>
                        
                <li>
                    <div className='game' onClick={()=> manageShowModal("Tragamonedas")}>
                        <img alt="tragamonedas" src={slots}></img><br />
                        <span>Tragamonedas</span>
                    </div>
                </li>

                <li>
                    <div className='game' onClick={()=> manageShowModal("Blackjack")}>
                        <img alt="blackjack" src={blackjack}></img><br />
                        <span>Blackjack</span>  
                    </div>
                </li>

                <li>
                    <div className='game' onClick={()=> manageShowModal("Ruleta")}>
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