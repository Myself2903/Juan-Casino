import { useNavigate } from "react-router-dom"
import { useState } from "react";
import '../styles/RegisterPage.css';
import axios from "axios";

export default function Register(){
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: "",
        name: "",
        surname: "",
        birth_date: "",
        coins: 100, //default coins when new account created
        password: ""
    })

    const register = async(event)=>{
        event.preventDefault()
        console.log(userData)
        
        //API Call
        await axios
        .post("http://127.0.0.1:8000/register", userData,{ 
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
             }
        })
        .then(response =>{
                console.log(response)
        })
        .catch(error =>{
            console.log(error)
        })
    }
    
    return(
        <div className="registerPage">
            <header className="registerHeader">
                <button className="button backButton" onClick={()=>navigate("/")}> &lt;-</button>
                <h1 className="registerTitle">Register page</h1>
            </header>            

            <form className="registerForm">
                <div className="field">   
                    <label>Nombres: </label>
                    <input type="text"  onChange={(e)=>setUserData({...userData, name: e.target.value})} required />
                </div>

                <div className="field">   
                    <label>Apellidos: </label>
                    <input type="text" onChange={(e)=>setUserData({...userData, surname: e.target.value})} required />
                </div>

                <div className="field">   
                    <label>Nombre de usuario: </label>
                    <input type="text" onChange={(e)=>setUserData({...userData, username: e.target.value})} required />
                </div>

                <div className="field">
                    <label>Fecha de Nacimiento: </label>
                    <input type="date"  onChange={(e)=>setUserData({...userData, birth_date: e.target.value})} required/>
                </div>
                
                <div className="field">
                    <label>Correo: </label>
                    <input type="email" onChange={(e)=>setUserData({...userData, email: e.target.value})} required/>
                </div>  

                <div className="field">
                    <label>Contraseña: </label>
                    <input type="password" onChange={(e)=>setUserData({...userData, password: e.target.value})} required/>
                </div>

                <button className="button" onClick={register} type="submit">registrar</button>
            </form> 
        </div>
    )
}