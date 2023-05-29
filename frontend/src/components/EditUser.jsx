import {useNavigate} from 'react-router'
import {fetchToken} from '../Auth'
import { useEffect, useState, useRef } from 'react'
import { uploadUserImage } from '../firebase/config'
import axios from "axios";
import Modal from './Modal'
import '../styles/EditUser.css'
import Loading from './Loading'


//Guide: https://dev.to/oyedeletemitope/login-authentication-with-react-and-fastapi-397b
//Guide: https://www.youtube.com/watch?v=fN_jxm_47xI

export default function Edit(props){
    const [showModal, setShowModal] = useState(false) // Modal hook
    const [showLoading, setShowLoading] = useState(false) //loading screen

    const navigate = useNavigate()
    const token = localStorage.getItem("auth_token")
    const URL = import.meta.env.VITE_BASE_URL
    const URLEXTENSION = '/profile/update'
    const fileInputRef = useRef(null);
    //json structure need for query
    const [EditUser, setEditUser] = useState({})
    const [avatar, setAvatar] = useState()

    const instance = axios.create({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }); 

    useEffect(()=>{ 
                setEditUser(props.params["user"])
                setAvatar(props.params["user"]["picture"])
            }
        , [props.params["user"]])

    //hooks for show error when login attempt
    const [nameValid, setNameValid] = useState(true)
    const [surnameValid, setSurnameValid] = useState(true)
    const [usernameValid, setUsernameValid] = useState(true)
    const [birthdateValid, setBirthdateValid] = useState(true)

    const handleImageUpload = () => {
        fileInputRef.current.click();
    };

    const handleFileSelected = async (event) => {
        const file = event.target.files[0];
        setEditUser({...EditUser, picture: file})
        const reader = new FileReader();
        reader.onload = () => {
            setAvatar(reader.result);
        };
        reader.readAsDataURL(file);
    };

    //login verification function
    const edit = async(event) => {
        event.preventDefault(); //prevent page to reload
        console.log(EditUser); //shows query params
        setShowLoading(true)

        //check for not empty
        if(EditUser.name == ""){ 
            setNameValid(false)
            setShowLoading(false)
            return;
        }

        if(EditUser.surname == ""){
            setSurnameValid(false)
            setShowLoading(false)
            return;
        }

        if(EditUser.username == ""){
            setUsernameValid(false)
            setShowLoading(false)
            return;
        }

        if(EditUser.birthdate == ""){
            setBirthdateValid(false)
            setShowLoading(false)
            return;
        }
        
        //close error message
        setNameValid(true)
        setSurnameValid(true)
        setNameValid(true)
        setBirthdateValid(true)

        try{
            let userdata = EditUser
            if (EditUser["picture"] != "public/assets/horsePortrait.png"){
                const response = await uploadUserImage(EditUser["picture"], EditUser["iduser"])
                console.log(response)
                userdata["picture"] = response
                console.log("done")
            }


            //API call
            await instance
            .put(URL + URLEXTENSION, userdata)
            .then(async response => {
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

            setShowLoading(false)
            setShowModal(false)
            window.location.reload(false);

        }catch (error){
            console.log(error)
            alert("fallo al subir la imagen")
        }

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
                                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileSelected} />
                                    <div className='editImageContainer'>
                                        <div className='overlay' onClick={handleImageUpload}>
                                            <label>Cambiar foto</label>
                                        </div>
                                        <img src = {avatar} className='editImage' />
                                    </div>
                                    
                                    <input
                                        value = {EditUser.username}
                                        type="username"
                                        onChange={(e) => setEditUser({...EditUser, username: e.target.value})}//save username info in hook. username is for python understanding
                                        className= {`formInput ${usernameValid ? '': 'invalidInput'}`} //apply styles when error message
                                        placeholder='Nombre de usuario'
                                    />

                                    <input
                                        value = {EditUser.name}
                                        type="name"
                                        onChange={(e) => setEditUser({...EditUser, name: e.target.value})} //save name info in hook.
                                        className={`formInput ${nameValid ? '': 'invalidInput'}`} //apply styles when error message
                                        placeholder= 'Nombre'
                                    />
                                    
                                    <input
                                        value = {EditUser.surname}
                                        type="surname"
                                        onChange={(e) => setEditUser({...EditUser, surname: e.target.value})}//save surname info in hook.
                                        className= {`formInput ${surnameValid ? '': 'invalidInput'}`} //apply styles when error message
                                        placeholder='Apellido'
                                    />

                                    <input
                                        value = {EditUser.birthdate}
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
            <Loading
            show = {showLoading}
                    onClose = {() => {
                    setShowLoading(false)
                }}
            />
        </div>
    )

}