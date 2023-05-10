import "../styles/DropdownMenu.css"
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const DropdownMenu = props =>{
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate() 
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    }
  
    const handleOptionClick = (option) => {
      switch (option) {
        case 'ver perfil':
          navigate("/profile")
          break;
        case 'ver amigos':
          navigate("/friends")
          break;

        case 'juegos':
          navigate("/")
          setTimeout( () => {
            const gamesPreviewSection = document.getElementById('games_preview');
            if (gamesPreviewSection) {
              gamesPreviewSection.scrollIntoView({ behavior: 'smooth' });
            }
          }, 500)
          break;
        
          case 'cerrar sesión':
          localStorage.removeItem("auth_token") 
          localStorage.removeItem("auth_token_type")
          navigate("/");
          break;
        
        default:
          break;
      }
      setIsOpen(false);
    }
  
    return (
      <div className="user-dropdown-menu">
        <button className="dropdown-trigger" onClick={toggleMenu}>
          <img className="user-dropdown-menu-image" src={props.image} alt="User" />
        </button>
        {isOpen && (
          <ul className="dropdown-items">
            <li className="dropdown-item" onClick={() => handleOptionClick('ver perfil')}>Ver perfil</li>
            <li className="dropdown-item" onClick={() => handleOptionClick('ver amigos')}>Ver amigos</li>
            <li className="dropdown-item" onClick={() => handleOptionClick('juegos')}>Juegos</li>
            <li className="dropdown-item" onClick={() => handleOptionClick('cerrar sesión')}>Cerrar sesión</li>
          </ul>
        )}
      </div>
    );
}

export default DropdownMenu