import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import logo from '../assets/Juan_Logo.svg';

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
                {token ? <p>Se ha autenticado con exito! favor inice sesion</p>:
                    <p>Credenciales de autenticacion invalidas</p>
                }
            </main>
        </>
    )
}