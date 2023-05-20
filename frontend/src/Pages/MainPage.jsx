import logo from '../assets/Juan_Logo.svg'
import poker from '../assets/poker.jpg'
import slots from '../assets/slots.jpg'
import blackjack from '../assets/blackjack.jpg'
import roulette from '../assets/roulette.jpg'
import Login from '../components/Login'
import Modal from '../components/Modal'
import '../styles/MainPage.css'
import DropdownMenu from '../components/DropdownMenu'
import axios from 'axios'
import { fetchToken } from '../Auth'
import { redirect, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getUsrImage } from '../Functions'


const MainPage = ()=>{
    const [modalShow, setModalShow] = useState(false); //hook for modal window
    const [modalParams, setModalParams] = useState([]);  //hook for params used on <Modal>
    const [showLogin, setShowLogin] = useState(false)
    const [loginRedirection, setLoginRedirection] = useState("")
    const [usrImage, setUsrImage] = useState("")
    const navigate = useNavigate(); // navigate instance
    const token = fetchToken()

    const scrollGamesPreview = ()=>{
        document.getElementById('games_preview').scrollIntoView({ behavior: 'smooth' }) //scroll when clicked the main section to games preview
    }

    //set Modal params and show it. The params idea is for more customizable and reusable code
    const manageModal = (header, content, footer) =>{
        setModalParams({'header': header, 'content': content, 'footer': footer})
        setModalShow(true)        
    }
    const handleOpenLoginModal = redirection => {
        setModalShow(false);
        setShowLogin(true);
        setLoginRedirection(redirection)
        console.log(loginRedirection)
      };

    //specific set form for game Modal
    const showModalGame = (game, description)=>{ //Show game info with Modal
        let header = <h2 className="modal-title">{game}</h2>
        let footer = <>
                        <button className="button" onClick={()=> setModalShow(false)} >Cerrar</button>
                        <a className="button play" onClick={() => handleOpenLoginModal(game)}>Jugar</a> 
                     </>
        manageModal(header, description, footer)
    }

    if(token){
        useEffect(() => {
            const fetchUserImage = async () => {
              const image = await getUsrImage();
              setUsrImage(image);
            };
        
            fetchUserImage();
          }, []);
    }
    
    //page 
    return(
        <>
            <header>
                <nav className="nav_content">
                    <img alt="logo" className="logo" src={logo} />
                    <h1 className='title'>¡Juega y Gana!</h1>
                    {token ?  <DropdownMenu image={usrImage}/> :
                        <ul className="user_bar">
                            <li> <button className='button' onClick={()=>navigate('/register')}>Registrate</button></li>
                            <li><button className="button login" onClick={()=>handleOpenLoginModal("profile")}>Iniciar sesión</button></li>
                        </ul>
                    }
                    
                </nav>
            </header>
            
            <main>
            <section id="main_page">
                <img alt="logo" src={logo} onClick={scrollGamesPreview} /> 
                <button className='button' id="play_now" onClick={scrollGamesPreview}>¡Juega ahora!</button>
            </section>

            <section id="games_preview">
                <h1 className='title'>Lista de juegos</h1>
                    <div id="game_selector">
                        <ul id="game_list">
                            <li>
                                <div className='game' onClick={
                                    token ? ()=>navigate('/Poker') :
                                    ()=> showModalGame("Poker", "Crea la mejor combinación de 5 cartas para ganar. 2 - 4 jugadores. Se necesitan mínimo 25 fichas para jugar.")}>
                                    <img alt="poker" src={poker}></img><br />
                                    <span>Poker</span>
                                </div>
                            </li>
                                    
                            <li>
                                <div className='game' onClick={
                                    token ? ()=>navigate('/Tragamonedas') :
                                    ()=> showModalGame("Tragamonedas", "Consigue una de las combinaciones posibles para ganar fichas. 1 jugador. Se necesitan mínimo 2 fichas para jugar.")}>
                                    <img alt="tragamonedas" src={slots}></img><br />
                                    <span>Tragamonedas</span>
                                </div>
                            </li>

                            <li>
                                <div className='game' onClick={
                                    token ? ()=>navigate('/Blackjack') : 
                                    ()=> showModalGame("Blackjack", "Intenta acercarte lo más posible hasta el 21 sin pasarte. 2 - 4 jugadores. Se necesitan mínimo 25 fichas para jugar.")}>
                                    <img alt="blackjack" src={blackjack}></img><br />
                                    <span>Blackjack</span>  
                                </div>
                            </li>

                            <li>
                                <div className='game' onClick={
                                    token ? ()=>navigate('/Ruleta') :
                                    ()=> showModalGame("Ruleta", "Atina la posición en la que se detiene la ruleta para multiplicar tu apuesta. 1 - 4 jugadores. Se necesitan mínimo 5 fichas para jugar.")
                                    }>
                                    <img alt="ruleta" src={roulette}></img><br />
                                    <span>Ruleta</span>  
                                </div>
                            </li>
                        </ul>
                        {token ?  <></> :
                            <button className="button login" onClick={()=>handleOpenLoginModal("profile")}>Iniciar sesión</button>
                        }
                    </div>
                    <Modal show={modalShow} onClose={()=> setModalShow(false)} params={modalParams} />
                    <Login showModal={showLogin} setShowModal={setShowLogin} redirection={loginRedirection}/>
                </section>
            </main>

        </>
    );
}

export default MainPage;