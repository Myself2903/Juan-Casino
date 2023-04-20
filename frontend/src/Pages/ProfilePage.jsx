import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/ProfilePage.css';
import SignOut from  '../components/Signout';
import logo from '../assets/Juan_Logo.svg';
import picture from '../assets/horsePortrait.svg';
import man from '../assets/SadJuan.jpg';


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
        console.log(response)
        setData(response.data) //store data 
        console.log(data);
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
              <img alt="logo" src={logo} />
              <h1 className='title'>Perfil de usuario</h1>
              <div id="user_bar">
                <SignOut/>
              </div>
          </nav>
      </header>

      <div className="profilePage">
        
        <h2>Tarjeta de usuario</h2>
        <div className="userCard">
          <div className="userPicture">
              <img className="profilePicture" src={picture} alt="fotoDePerfil"/>
          </div>
          <div className="userInfo">
            <p>{data.username} #{data.iduser}</p>
            <p>{data.name} {data.surname}</p>
            <p>{data.email}</p>
            <p>{data.birthdate}</p>
          </div>
        </div>

        <div className="friendsTittle">
          <h2>Amigos:</h2>
        </div>
        <div className="noFriends">
          <h3>No hay amigos que mostrar...</h3>
          <img id="sadHorse" src={man} alt="caballo triste" />
        </div>
        <div className="friends">
          {/* volver las tarjetas una función reutilizable*/}
          

        </div>

      </div>
    </>
  );
}