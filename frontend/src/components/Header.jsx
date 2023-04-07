import Login from './Login';
import Register from './Register'
import logo from '../assets/Juan_Logo.svg';
import '../styles/Header.css'

const Header = ()=>{
    return(
        <header>
          <nav id="nav_content">
              <img alt="logo" src={logo} />
              <h1>¡Juega y Gana!</h1>
              <ul id="user_bar">
                <li><Register/></li>
                <li><Login/></li>
              </ul>
          </nav>
        </header>
    );
}

export default Header;