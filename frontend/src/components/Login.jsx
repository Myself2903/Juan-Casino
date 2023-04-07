import {useNavigate} from 'react-router'
import {fetchToken} from '../Auth'
import { useState } from 'react'
import axios from "axios";
import Modal from './Modal'
import '../styles/Login.css'

//Guide: https://dev.to/oyedeletemitope/login-authentication-with-react-and-fastapi-397b

export default function Login(){
    const [showModal, setShowModal] = useState(false)

    const navigate = useNavigate()  
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const login = () => {
        if((username == "") & (password == "")){ //check for not empty
            return;
        }else{
            //API call
            axios
            .post("http://127.0.0.1:8000/login", {
              username: username,
              password: password
            })
            .then(response => {
                console.log(response)    
                console.log(response.data.token, "response.data.token");
                if (response.data.token) {
                    setToken(response.data.token);
                    navigate("/profile");
                }
            })
            .catch(function (error) {
              console.log(error, "error");
            });
        }

    }
    
    
    const header = <h2>login page</h2>
    const content= <div>
                        {fetchToken() ? (
                            <p>Estas logeado</p>
                        ) : (
                            <div>
                            <form className='loginForm'>
                                <label>Usuario:</label>
                                <input
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                                />

                                <label>Contraseña: </label>
                                <input
                                type="text"
                                onChange={(e) => setPassword(e.target.value)}
                                />

                                <label>tu usuario es: {username} y es de tipo: {typeof(username)}</label>
                                <button className='button loginButton' onClick={login}>ingresar </button>
                            </form>
                            </div>
                        )}
                    </div>

    return (
        <div>
            <a onClick={() => setShowModal(true)}>
                Inicia sesión
            </a>
            <Modal
                show = {showModal}
                onClose = {() => setShowModal(false)}
                params ={{'header': header, 'content': content, 'footer': null}}
            />
        </div>
    )

}