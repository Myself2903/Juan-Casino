import logo from '../assets/Juan_Logo.svg';
import poker from '../assets/poker.jpg'
import slots from '../assets/slots.jpg'
import blackjack from '../assets/blackjack.jpg'
import roulette from '../assets/roulette.jpg'
import { useState } from 'react';
import Login from './Login';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

import '../styles/MainPage.css'

const MainPage = ()=>{
    const [modalShow, setModalShow] = useState(false); //hook for modal window
    const [modelParams, setModalParams] = useState([]);  //hook for params used on <Modal>

    const navigate = useNavigate(); // navigate instance

    const scrollGamesPreview = ()=>{
        document.getElementById('games_preview').scrollIntoView({ behavior: 'smooth' }) //scroll when clicked the main section to games preview
    }

    //set Modal params and show it. The params idea is for more customizable and reusable code
    const manageModal = (header, content, footer) =>{
        setModalParams({'header': header, 'content': content, 'footer': footer})
        setModalShow(true)        
    }

    //specific set form for game Modal
    const showModalGame = (game, description)=>{ //Muestra la información de un juego en un modal
        let header = <h2 className="modal-title">{game}</h2>
        let footer = <>
                        <button className="button" onClick={()=> setModalShow(false)} >Cerrar</button>
                        <a className="button play" onClick={()=>console.log(`${game} no disponible`)}>Jugar</a> 
                     </>
        manageModal(header, description, footer)
    }
    
    //page 
    return(
        <>
            <header>
            <nav id="nav_content">
                <img alt="logo" src={logo} />
                <h1 className='title'>¡Juega y Gana!</h1>
                <ul id="user_bar">
                    <li> <button className='button' onClick={()=>navigate('/register')}>Registrate</button></li>
                    <li><Login/></li>
                </ul>
            </nav>
            </header>
            
            <section id="main_page">
                <img alt="logo" src={logo} onClick={scrollGamesPreview} /> 
                <button className='button' id="play_now" onClick={scrollGamesPreview}>¡Juega ahora!</button>
            </section>

            <section id="games_preview">
                <h1 className='title'>Lista de juegos</h1>
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

                <Login />
                </div>
                <Modal show={modalShow} onClose={()=> setModalShow(false)} params={modelParams} />
            </section>
        </>
    );
}

export default MainPage;