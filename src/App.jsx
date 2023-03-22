import './App.css';
import logo from './assets/Juan_Logo.svg';
import poker from './assets/poker.jpg';
import slots from './assets/slots.jpg';
import blackjack from './assets/blackjack.jpg';
import roulette from './assets/roulette.jpg';

function App() {

  return (
    <div className="App">
      <header>
          <nav id="nav_content">
              <img alt="logo" src={logo} />
              <h1>¡Juega y Gana!</h1>
              <ul id="user_bar">
                <li><button>Registrate</button></li>
                <li><button>Logeate</button></li>
              </ul>
          </nav>
        </header>
        
        <section id="main_page">
          <img alt="logo" src={logo} /> 
          <button id="play_now">¡Juega ahora!</button>
        </section>

        <section id="games_preview">
          <h1>Lista de juegos</h1>
          <div id="game_selector">
            <ul id="game_list">
              <li>
                <a href = "#">
                  <img alt="poker" src={poker}></img><br />
                  <span>Poker</span>
                </a>
              </li>
                    
              <li>
                <a href="#">
                  <img alt="tragamonedas" src={slots}></img><br />
                  <span>Tragamonedas</span>
                </a>
              </li>

              <li>
                <a href="#">
                  <img alt="blackjack" src={blackjack}></img><br />
                  <span>Blackjack</span>  
                </a>
              </li>

              <li>
                <a href="#">
                  <img alt="ruleta" src={roulette}></img><br />
                  <span>Ruleta</span>  
                </a>
              </li>

            </ul>
            <button id="register_button">Registrate</button>
          </div>
        </section>
    </div>
  )
}

export default App
