import "../styles/DropdownMenu.css"
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

const DropdownMenu = props =>{
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate() 
    
    let menuRef = useRef()

    useEffect(()=>{
      const handler = e => {
        if (!menuRef.current.contains(e.target)){  setIsOpen(false); }
      } 

      document.addEventListener("mousedown", handler)
      return()=>{
        document.removeEventListener("mousedown", handler)
      }
    })
  
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
          window.location.reload(false);
          break;
        
        default:
          break;
      }
      setIsOpen(false);
    }
  
    return (
      <div className="user-dropdown-menu" ref ={menuRef}>
        <button className="dropdown-trigger" onClick={()=>setIsOpen(!isOpen)}>
          <img className="user-dropdown-menu-image" src={props.image} alt="User" />
        </button>
        <ul className= {`dropdown-items ${isOpen ? 'active': 'inactive'}`}>
            <li className="dropdown-item first-item" onClick={() => handleOptionClick('ver perfil')}>Ver perfil</li>
            <li className="dropdown-item" onClick={() => handleOptionClick('ver amigos')}>Ver amigos</li>
            <li className="dropdown-item" onClick={() => handleOptionClick('juegos')}>Juegos</li>
            <li className="dropdown-item last-item" onClick={() => handleOptionClick('cerrar sesión')}>Cerrar sesión</li>
        </ul>
      </div>
    );
}

export default DropdownMenu