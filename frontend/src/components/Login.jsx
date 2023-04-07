import {useNavigate} from 'react-router'
import {fetchToken} from '../Auth'
import { useState } from 'react'
import axios from "axios";
import Modal from './Modal'
import '../styles/Login.css'


//Guide: https://dev.to/oyedeletemitope/login-authentication-with-react-and-fastapi-397b
//Guide: https://www.youtube.com/watch?v=fN_jxm_47xI

export default function Login(){
    const [showModal, setShowModal] = useState(false)

    const navigate = useNavigate()  
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    })
    const [loginCredentialStatus, setLoginCredentialStatus] = useState(true) //verdadero si estan bien, falso si se ingresan crendenciales invalidas

    const login = async(event) => {
        event.preventDefault();
        console.log(loginForm);
        if((loginForm.username == "") & (loginForm.password == "")){ //check for not empty
            return;
        }else{
            //API call
        await axios
            .post("http://127.0.0.1:8000/login", loginForm, {
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(response => {
                console.log(response)    
                console.log(response.data.access_token, "response.data.token");

                //save token in local storage
                if (response.data.access_token) {
                    localStorage.setItem("auth_token", response.data.access_token)
                    localStorage.setItem("auth_token_type", response.data.token_type)
                    navigate("/profile"); //navigate to profile page
                }
            })
            .catch((error) => {
              console.log(error, "error");
              if(error.response.status == 400){
                setLoginCredentialStatus(false)
              }
            });
        }

    }
    

    const header = <h2>login page</h2>
    const content= <div>
                        {fetchToken() ? (
                            <p>Estas logeado</p>
                        ) : (
                            <div>
                                <form className='loginForm' onSubmit={login}>
                                    <label>Usuario:</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                                    />

                                    <label>Contraseña: </label>
                                    <input
                                        type="password"
                                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                                    />
                                    
                                    {!loginCredentialStatus ? <label className={'errorMessage'}>Crendenciales invalidas </label>: null}
                                    <button className='button loginButton' type='submit'>ingresar </button>
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