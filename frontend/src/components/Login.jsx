import {useNavigate} from 'react-router'
import {fetchToken} from '../Auth'
import { useState } from 'react'
import axios from "axios";
import Modal from './Modal'
import '../styles/Login.css'


//Guide: https://dev.to/oyedeletemitope/login-authentication-with-react-and-fastapi-397b
//Guide: https://www.youtube.com/watch?v=fN_jxm_47xI

export default function Login(){
    const [showModal, setShowModal] = useState(false) // Modal hook

    const navigate = useNavigate() 

    //json structure need for query
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    })
    
    //hooks for show error when login attempt
    const [emailValid, setEmailValid] = useState(true)
    const [passwordValid, setPasswordValid] = useState(true) 

    //login verification function
    const login = async(event) => {
        event.preventDefault(); //prevent page to reload
        console.log(loginForm); //shows query params
        
        //check for not empty
        if(loginForm.username == ""){ 
            setEmailValid(false)
            if(loginForm.password == "")
                setPasswordValid(false)
            return;
        }

        if(loginForm.password == ""){
            setPasswordValid(false)
            return;
        }
        
        //close error message
        setEmailValid(true)
        setPasswordValid(true)

        //API call
        await axios
        .post("https://juan-casino-backend.onrender.com/login", loginForm, {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            console.log(response)    
            console.log(response.data.access_token, "response.data.token");

            //save token in local storage
            if (response.data.access_token) {
                localStorage.setItem("auth_token", response.data.access_token)  //token
                localStorage.setItem("auth_token_type", response.data.token_type) //token type
                navigate("/profile"); //navigate to profile page
            }
        })
        .catch((error) => {
            console.log(error, "error");
            switch(error.response.status){
                case 400: //error invalid password
                    setPasswordValid(false)
                    break;
                
                case 404: //error user not found
                    setEmailValid(false)
                    break;

                default:
                    break;
            }
        });
    }
    
    //modal header
    const header = <h2 className='header'>Iniciar sesión</h2>
    
    //modal content
    const content= <div>
                        {fetchToken() ? ( //right now you still seeing the login button when logged. Show logged message
                            <p>Estas logeado</p>
                        ) : (
                            <div>
                                <form className='loginForm' onSubmit={login}>
                                    <input
                                        type="email"
                                        onChange={(e) => setLoginForm({...loginForm, username: e.target.value})} //save email info in hook. username is for python understanding
                                        className={`formInput ${emailValid ? '': 'invalidInput'}`} //apply styles when error message
                                        placeholder='Correo eléctronico'
                                        required
                                    />
                                    
                                    <input
                                        type="password"
                                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}//save email info in hook. username is for python understanding
                                        className= {`formInput ${passwordValid ? '': 'invalidInput'}`} //apply styles when error message
                                        placeholder='Contraseña'
                                    />

                                    {/* shows error message when incorrect password passed */}
                                    <label className={'errorMessage'}>
                                        {!(passwordValid) ? 'contraseña incorrecta': null}  
                                    </label>
                                    <a className='forgotPassword'>¿Olvidaste tu contraseña?</a>

                                    <button className='button loginButton' type='submit'>Iniciar sesión </button>
                                </form>
                            </div>
                        )}
                    </div>

    //Modal footer
    const footer = <div className='footer'> <button className='button registerButton'>Nueva cuenta</button></div>

    return (
        <div>
            <button className='button' onClick={() => setShowModal(true)}>
                Inicia sesión
            </button>
            <Modal
                show = {showModal}
                onClose = {() => {
                    setShowModal(false)
                    setEmailValid(true)
                    setPasswordValid(true)
                }}
                params ={{'header': header, 'content': content, 'footer': footer}}
            />
        </div>
    )

}