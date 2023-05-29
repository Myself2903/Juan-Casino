import {useNavigate} from 'react-router'
import {fetchToken} from '../Auth'
import { useState } from 'react'
import { deleteUserImage } from '../firebase/config'
import axios from "axios";
import Modal from './Modal'
import '../styles/EditUser.css'
import Loading from './Loading'



export default function Edit(props){
    const [showModal, setShowModal] = useState(false) // Modal hook
    const [showLoading, setShowLoading] = useState(false) //loading screen
    const navigate = useNavigate()
    const token = localStorage.getItem("auth_token")
    const URL = import.meta.env.VITE_BASE_URL
    const URLEXTENSION = '/profile/delete'

    const instance = axios.create({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });

    //Delete function
    const deleteAccount = async() => {      
        const data = props.params
        if(data.image != "assets/horsePortrait.png"){
            deleteUserImage(data.iduser)
        }

        //API call
        instance.delete(URL+URLEXTENSION)
        .then(response => {
            console.log(response)    
            console.log(response.data.access_token, "response.data.token");
            localStorage.removeItem('auth_token');
            navigate("/")
        })
        .catch((error) => {
            console.log(error, "error");
        });
    setShowLoading(false)
    setShowModal(false)
    //localStorage.removeItem("auth_token") 
    //localStorage.removeItem("auth_token_type")
    //navigate("/");
    }
    
    //modal header
    const header = <h2 className='header'>¿Estás segur@ que quieres borrar tu perfil?</h2>
    
    //modal content
    const content= <div>
                        {!(fetchToken()) ? ( //in case user is not loged
                            <p>No estas logeado</p>
                        ) : (
                            <div>
                                <p>Esta acción es irreversible, por lo que no podras recuperar tus fichas una vez elimines tu cuenta.</p>
                            </div>
                        )}
                    </div>

    //Modal footer
    const footer = <div>
        {!(fetchToken()) ? ( //in case user is not loged
                            <button className='button' onClick={() => setShowModal(false)}>Cancelar</button>
                        ) : (
                            <div className='footerDelete'>
                                <button className='deleteButton' onClick={deleteAccount}>Eliminar</button>
                                <button className='button' onClick={() => setShowModal(false)}>Cancelar</button>
                            </div>
                        )}
        </div>

    return (
        <div>
            <button className='deleteButton' onClick={() => setShowModal(true)}>
                Borrar cuenta
            </button>
            <Modal
                show = {showModal}
                onClose = {() => {
                    
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