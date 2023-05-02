import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/ProfilePage.css';
import SignOut from  '../components/Signout';
import logo from '../assets/Juan_Logo.svg';
import picture from '../assets/horsePortrait.svg';
import man from '../assets/JuanTriste.svg';
import Edit from '../components/EditUser';
import UserCard from "../components/UserCard";


export default function Profile() {
  const navigate = useNavigate();
  // access on cloud
  const url = 'https://juan-casino-backend.onrender.com'
  //test access
  // const url = 'http://127.0.0.1:8000'
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
        const info = response.data
        setData({
          'iduser': info.iduser,
          'name': info.name,
          'surname': info.surname,
          'username': info.username,
          'email': info.email,
          'birthdate': info.birthdate,
          'picture': info.idimage
        }) //store data
        
      })
      .catch(error =>{
        console.log("error: "+ error)
      })
    }
    fetchData()
  } , [])


  return (
    <>
      <header>
          <nav id="nav_content">
              <img alt="logo" src={logo} onClick={()=>navigate('/')}/>
              <h1 className='title'>Perfil de usuario</h1>
              <div id="user_bar">
                <SignOut/>
              </div>
          </nav>
      </header>

      <div className="profilePage">
        
        <h2>Tarjeta de usuario</h2>

        <UserCard params={data} /> 
        <p>{data['picture']}</p>

        <button className="button">Editar</button>

        <div className="friendsTittle">
          <h2>Amigos:</h2>
        </div>
        
        <div className="friendSpace">
          <div className="noFriends">
            <h3>No hay amigos que mostrar...</h3>
            <img id="sadHorse" src={man} alt="caballo triste" />
          </div>
          <div className="friends">
            {/* volver las tarjetas una función reutilizable*/}
            

          </div>
            <button className="button" onClick={()=>navigate('/friends')}>Añadir amigos</button>
          </div>
      </div>
    </>
  );
}