import { useNavigate } from "react-router-dom"
import { useState } from "react";
import '../styles/RegisterPage.css';
import axios from "axios";
import logo from '../assets/Juan_Logo.svg';
import decoration from '../assets/slotMachine.svg';
import leftchips from '../assets/greenPurpleChips.svg';
import rightchips from '../assets/orangeBlueChips.svg';
import Loading from '../components/Loading'

export default function Register(){
    const navigate = useNavigate();
    const url = 'https://juan-casino-backend.onrender.com'
    // const url = 'http://127.0.0.1:8000'
    const urlExtension = '/register'
    const [showLoading, setShowLoading] = useState(false) //loading screen
    const [userData, setUserData] = useState({
        username: "",
        name: "",
        surname: "",
        email: "",
        birthdate: "",
        coins: 100, //default coins when new account created
        password: "",
    })

    const register = async(event)=>{
        event.preventDefault()
        setShowLoading(true)
        //API Call
        await axios
        .post(url+urlExtension, userData, { 
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response =>{
                console.log(response)
                navigate(("/"))
        })
        .catch(error =>{
            console.log(error)
        })
        setShowLoading(false)
    }
    
    return(
        <>
        <header>
            <nav className="nav_content">
                <img alt="logo" src={logo} onClick={()=>navigate('/')} className="logo"/>
                <h1 className='title'>¡Registrate!</h1>
            </nav>
        </header>

        <div className="background">
            <div className="registerPage">
            <div className="sideImage">
                <img src={decoration} alt="caja_fuerte" />
            </div>

            <div className="registerItems">
                <form className="registerForm">
                    <div className="field">
                    <Loading
                        show = {showLoading}
                        onClose = {() => {
                            setShowLoading(false)
                        }}
                    /> 
                        <label>Nombres: </label>
                    </div>
                    <div className="field"> 
                        <input type="text"  onChange={(e)=>setUserData({...userData, name: e.target.value})} required />
                    </div>

                    <div className="field">   
                        <label>Apellidos: </label>
                    </div>
                    <div className="field">
                        <input type="text" onChange={(e)=>setUserData({...userData, surname: e.target.value})} required />
                    </div>

                    <div className="field">   
                        <label>Nombre de usuario: </label>
                    </div>
                    <div className="field"> 
                        <input type="text" onChange={(e)=>setUserData({...userData, username: e.target.value})} required />
                    </div>

                    <div className="field">
                        <label>Fecha de Nacimiento: </label>
                    </div>
                    <div className="field">
                        <input type="date"  onChange={(e)=>setUserData({...userData, birthdate: e.target.value})} required/>
                    </div>
                    
                    <div className="field">
                        <label>Correo: </label>
                    </div>
                    <div className="field">
                        <input type="email" onChange={(e)=>setUserData({...userData, email: e.target.value})} required/>
                    </div>  

                    <div className="field">
                        <label>Contraseña: </label>
                    </div>
                    <div className="field">
                        <input type="password" onChange={(e)=>setUserData({...userData, password: e.target.value})} required/>
                    </div>               
                </form>
                <div id="registerButton">
                        <button className="button" onClick={register} type="submit">registrarse</button>
                </div>
            </div>
        </div>
        <div className="chipsDecoration">
            <img id="leftC" alt="fichas" src={leftchips} />
            <img id="rightC" alt="fichas" src={rightchips} />
        </div>
        </div>
        </>
    );
}