import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import axios from "axios";
import logo from '../assets/Juan_Logo.svg';
import '../styles/RegisterPage.css';
import entrance from '../assets/CasinoEntrance.svg';

export default function VerifyAccount(){
    const location = useLocation();
    const params = new URLSearchParams(location.search); 
    const token = params.get('token');
    const URL = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate();

    axios.post(`${URL}/register/verifyAccount`, { token })
    .then(response => {console.log(response)})
    .catch(error => console.log(error))

    return(
        <>
            <header>
                <nav className="nav_content">
                    <img alt="logo" src={logo} onClick={()=>navigate('/')} className="logo"/>
                    <h1 className='title'>Verificar Cuenta</h1>
                </nav>
            </header>
            <main>
                {token ? <div className='verifyPage'>
                            <h1>¡Se ha autenticado con exito!</h1>
                            <img src={entrance} onClick={()=>navigate('/')} className="casinoDoor"/>
                            <h2>Bienvenido a Juan Casino</h2>
                            <button className='button' onClick={()=>navigate('/')}>Ingresar</button>
                        </div>:
                        <div className='verifyPage'>
                            <h1>Credenciales de autenticacion invalidas</h1>
                            <img src={entrance}/>
                        </div>
                }
            </main>
        </>
    )
}