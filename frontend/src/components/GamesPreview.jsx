import '../styles/GamesPreview.css'
import poker from '../assets/poker.jpg'
import slots from '../assets/slots.jpg'
import blackjack from '../assets/blackjack.jpg'
import roulette from '../assets/roulette.jpg'
import Modal from './Modal.jsx'
import { useState } from 'react'
import Login from './Login'
import Register from './Register'


const GamesPreview = ()=>{

    const [modalShow, setModalShow] = useState(false);
    const [modelParams, setModalParams] = useState([]); 

    const manageModal = (header, content, footer) =>{
        setModalParams({'header': header, 'content': content, 'footer': footer})
        setModalShow(true)        
    }

    const showModalGame = (game, description)=>{ //Muestra la información de un juego en un modal
        let header = <h2 className="modal-title">{game}</h2>
        let footer = <>
                        <button className="button" onClick={()=> setModalShow(false)} >Cerrar</button>
                        <a className="button play" onClick={()=>console.log(`${game} no disponible`)}>Jugar</a> 
                     </>
        manageModal(header, description, footer)
    }

    return (
        <section id="games_preview">
            <h1>Lista de juegos</h1>
            <div id="game_selector">
            <ul id="game_list">
                <li>
                    <div className='game' onClick={()=> showModalGame("Póker", "Crea la mejor combinación de 5 cartas para ganar. 2 - 4 jugadores. Se necesitan mínimo 25 fichas para jugar.")}>
                        <img alt="poker" src={poker}></img><br />
                        <span>Poker</span>
                    </div>
                </li>
                        
                <li>
                    <div className='game' onClick={()=> showModalGame("Tragamonedas", "Consigue una de las combinaciones posibles para ganar fichas. 1 jugador. Se necesitan mínimo 2 fichas para jugar.")}>
                        <img alt="tragamonedas" src={slots}></img><br />
                        <span>Tragamonedas</span>
                    </div>
                </li>

                <li>
                    <div className='game' onClick={()=> showModalGame("Blackjack", "Intenta acercarte lo más posible hasta el 21 sin pasarte. 2 - 4 jugadores. Se necesitan mínimo 25 fichas para jugar.")}>
                        <img alt="blackjack" src={blackjack}></img><br />
                        <span>Blackjack</span>  
                    </div>
                </li>

                <li>
                    <div className='game' onClick={()=> showModalGame("Ruleta", "Atina la posición en la que se detiene la ruleta para multiplicar tu apuesta. 1 - 4 jugadores. Se necesitan mínimo 5 fichas para jugar.")}>
                        <img alt="ruleta" src={roulette}></img><br />
                        <span>Ruleta</span>  
                    </div>
                </li>
            </ul>

            <Register />
            </div>
            <Modal show={modalShow} onClose={()=> setModalShow(false)} params={modelParams} />
        </section>
    );
}

export default GamesPreview;