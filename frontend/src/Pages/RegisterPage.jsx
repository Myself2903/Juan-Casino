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
    const URL = import.meta.env.VITE_BASE_URL
    const URLEXTENSION = '/register'
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

    const [nameValid, setNameValid] = useState(true)
    const [surnameValid, setSurnameValid] = useState(true)
    const [emailValid, setEmailValid] = useState(true)
    const [usernameValid, setUsernameValid] = useState(true)
    const [dateValid, setDateValid] = useState(true)
    const [passwordValid, setPasswordValid] = useState(true)
    let empty = 0;
    const register = async(event)=>{
        event.preventDefault()
        //sets everything as valid and resets counter
        empty = 0;
        setNameValid(true)
        setSurnameValid(true)
        setEmailValid(true)
        setUsernameValid(true)
        setDateValid(true)
        setPasswordValid(true)
        
        //check for not empty
        if(userData.name == ""){ 
            setNameValid(false)
            empty++;
        }
        if(userData.surname == ""){ 
            setSurnameValid(false)
            empty++;
        }
        if(userData.username == ""){ 
            setUsernameValid(false)
            empty++;
        }
        if(userData.birthdate == ""){ 
            setDateValid(false)
            empty++;
        }
        if(userData.email == ""){ 
            setEmailValid(false)
            empty++;
        }else{
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if(!emailRegex.test(userData.email)){
                setEmailValid(false)
                empty++;
            }
        }
        if(userData.password == ""){ 
            setPasswordValid(false)
            empty++;
        }
        //checks if there's one or more empty fields
        if(empty > 0){
            return;
        }

        {/*let today = new Date();
        console.log(today);
        if(((today - userData.birthdate)/100/60/60/24) < 3650){
            setDateValid(false)
        }*/}
        
        //close error message
        setEmailValid(true)

        setShowLoading(true)
        //API Call
        await axios
        .post(URL+URLEXTENSION, userData, { 
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response =>{
            if (response.status == 201){
                console.log(response)
                navigate(("/"))
            }
        })
        .catch(error =>{
            console.log(error)
            switch(error.response.status){         
                case 403: //error unvalid entity
                    setDateValid(false)
                    break;

                default:
                    break;
            }
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
                        <input
                        type="text"
                        onChange={(e)=>setUserData({...userData, name: e.target.value})}
                        className={`${nameValid ? 'fieldInput': 'invalidRegister'}`}
                        required />
                    </div>

                    <div className="field">   
                        <label>Apellidos: </label>
                    </div>
                    <div className="field">
                        <input
                        type="text"
                        onChange={(e)=>setUserData({...userData, surname: e.target.value})}
                        className={`${surnameValid ? 'fieldInput': 'invalidRegister'}`}
                        required />
                    </div>

                    <div className="field">   
                        <label>Nombre de usuario: </label>
                    </div>
                    <div className="field"> 
                        <input
                        type="text"
                        onChange={(e)=>setUserData({...userData, username: e.target.value})}
                        className={`${usernameValid ? 'fieldInput': 'invalidRegister'}`}
                        required />
                    </div>

                    <div className="field">
                        <label>Fecha de Nacimiento: </label>
                    </div>
                    <div className="field">
                        <input
                        type="date"
                        onChange={(e)=>setUserData({...userData, birthdate: e.target.value})}
                        className={`${dateValid ? 'fieldInput': 'invalidRegister'}`}
                        required/>
                    </div>
                    
                    <div className="field">
                        <label>Correo: </label>
                    </div>
                    <div className="field">
                        <input
                        type="email"
                        onChange={(e)=>setUserData({...userData, email: e.target.value})}
                        className={`${emailValid ? 'fieldInput': 'invalidRegister'}`}
                        required/>
                    </div>  

                    <div className="field">
                        <label>Contraseña: </label>
                    </div>
                    <div className="field">
                        <input
                        type="password"
                        onChange={(e)=>setUserData({...userData, password: e.target.value})}
                        className={`${passwordValid ? 'fieldInput': 'invalidRegister'}`}
                        required/>
                    </div>               
                </form>
                <div id="registerButton">
                    <p>Para registrarte debes tener al menos 10 años de edad.</p>
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