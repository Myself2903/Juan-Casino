import {useNavigate} from 'react-router'
import {fetchToken} from '../Auth'
import { useState } from 'react'
import axios from "axios";
import Modal from './Modal'
import '../styles/EditUser.css'
import qs from 'qs'


//Guide: https://dev.to/oyedeletemitope/login-authentication-with-react-and-fastapi-397b
//Guide: https://www.youtube.com/watch?v=fN_jxm_47xI

export default function Edit(){
    const [showModal, setShowModal] = useState(false) // Modal hook

    const navigate = useNavigate()
    const token = localStorage.getItem("auth_token")
    const url = 'https://juan-casino-backend.onrender.com'
    //const url = 'http://127.0.0.1:8000'
    const urlExtension = '/profile/update'

    //json structure need for query
    const [EditUser, setEditUser] = useState({
        username: "",
        surname: "",
        name: "",
        birthdate: ""
    })
    
    //hooks for show error when login attempt
    const [nameValid, setNameValid] = useState(true)
    const [surnameValid, setSurnameValid] = useState(true)
    const [usernameValid, setUsernameValid] = useState(true)
    const [birthdateValid, setBirthdateValid] = useState(true)

    //login verification function
    const edit = async(event) => {
        event.preventDefault(); //prevent page to reload
        console.log(EditUser); //shows query params
        
        //check for not empty
        if(EditUser.name == ""){ 
            setNameValid(false)
            return;
        }

        if(EditUser.surname == ""){
            setSurnameValid(false)
            return;
        }

        if(EditUser.username == ""){
            setUsernameValid(false)
            return;
        }

        if(EditUser.birthdate == ""){
            setBirthdateValid(false)
            return;
        }
        
        //close error message
        setNameValid(true)
        setSurnameValid(true)
        setNameValid(true)
        setBirthdateValid(true)
        
        //API call
        await axios
        .put(url + urlExtension, {
            
            username: EditUser.username,
            surname: EditUser.surname,
            name: EditUser.name,
            birthdate: EditUser.birthdate
            }
        , {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            console.log(response)    
            console.log(response.data.access_token, "response.data.token");
        })
        .catch((error) => {
            console.log(error, "error");
            switch(error.response.status){
                case 400: //error invalid password
                    //setPasswordValid(false)
                    break;
                
                case 404: //error user not found
                    //setEmailValid(false)
                    break;

                default:
                    break;
            }
        });
    }
    
    //modal header
    const header = <h2 className='header'>Editar perfil</h2>
    
    //modal content
    const content= <div>
                        {!(fetchToken()) ? ( //only if loged
                            <p>No estas logeado</p>
                        ) : (
                            <div>
                                <form className='editForm' onSubmit={edit}>
                                    <input
                                        type="username"
                                        onChange={(e) => setEditUser({...EditUser, username: e.target.value})}//save username info in hook. username is for python understanding
                                        className= {`formInput ${usernameValid ? '': 'invalidInput'}`} //apply styles when error message
                                        placeholder='Nombre de usuario'
                                    />

                                    <input
                                        type="name"
                                        onChange={(e) => setEditUser({...EditUser, name: e.target.value})} //save name info in hook.
                                        className={`formInput ${nameValid ? '': 'invalidInput'}`} //apply styles when error message
                                        placeholder= 'Nombre'
                                        defaultValue={"Juan"}
                                    />
                                    
                                    <input
                                        type="surname"
                                        onChange={(e) => setEditUser({...EditUser, surname: e.target.value})}//save surname info in hook.
                                        className= {`formInput ${surnameValid ? '': 'invalidInput'}`} //apply styles when error message
                                        placeholder='Apellido'
                                    />

                                    <input
                                        type="date" 
                                        onChange={(e)=>setEditUser({...EditUser, birthdate: e.target.value})}
                                        className= {`formInput ${birthdateValid ? '': 'invalidInput'}`}
                                        required
                                    />
                                    
                                    {/* shows error message when incorrect password passed 
                                    <label className={'errorMessage'}>
                                        {!(passwordValid) ? 'contraseña incorrecta': null}  
                                    </label>*/}
                                    <button className='button loginButton' type='submit' onClick={edit}>Guardar cambios </button>
                                </form>
                            </div>
                        )}
                    </div>

    //Modal footer
    const footer = <div className='footer'> <button className='button' onClick={() => setShowModal(false)}>Cancelar</button></div>

    return (
        <div>
            <button className='button' onClick={() => setShowModal(true)}>
                Editar
            </button>
            <Modal
                show = {showModal}
                onClose = {() => {
                    setShowModal(false)
                    setNameValid(true)
                    setSurnameValid(true)
                    setUsernameValid(true)
                    setBirthdateValid(true)
                }}
                params ={{'header': header, 'content': content, 'footer': footer}}
            />
        </div>
    )

}