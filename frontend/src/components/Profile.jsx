import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/Profile.css'

export default function Profile() {
  const navigate = useNavigate();
  const url = 'http://127.0.0.1:8000'
  const urlExtension = '/profile'
  const [data, setData] = useState([])

  const token = localStorage.getItem("auth_token")
  const config = {
    headers: {
      'Authorization' : `Bearer ${token}`
    }
  }

  // useEffect for save data at hook
  useEffect(()=>{
    async function fetchData(){
      await axios.get(url+urlExtension, config) //get query with token as a header config
      .then(response =>{
        console.log(response)
        setData(response.data) //store data 
      })
      .catch(error =>{
        console.log("error: "+ error)
      })
    }
    fetchData()
  } , [])

  //SignOut Function
  //remove token and token type from locale storage
  const signOut = () => {
    localStorage.removeItem("auth_token") 
    localStorage.removeItem("auth_token_type")
    navigate("/");
  };


  return (
    <>
      <div className="profilePage">
        <h1>Profile page</h1>
        <p>pagina de perfil de usuario</p>
        <div className="userInfo">
            <p>Nombre: {data.name}</p>
            <p>Apellido: {data.surname}</p>
            <p>Usuario: {data.username}</p>
            <p>Correo: {data.email}</p>
            <p>Monedas: {data.coins}</p>
            <p>Fecha Nacimiento: {data.birth_date}</p>
        </div>

        <button onClick={signOut}>cerrar sesión</button>
      </div>
    </>
  );
}