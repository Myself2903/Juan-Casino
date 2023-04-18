import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/ProfilePage.css';
import SignOut from  '../components/Signout';
import logo from '../assets/Juan_Logo.svg';
import picture from '../assets/horsePortrait.svg';
import redChip from '../assets/chip_red.svg';

export default function Profile() {
  const navigate = useNavigate();
  const url = 'https://juan-casino-backend.onrender.com'
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
            <p>{data.username} #{data.id}</p>
            <p>{data.name} {data.surname}</p>
            <p>{data.email}</p>
            <p>{data.birth_date}</p>
          </div>
        </div>

        <div className="friendsTittle">
          <h2>Amigos:</h2>
        </div>
        <div className="friends">
          {/* volver las tarjetas una función reutilizable*/}
          <div className="friendCard">
            <div className="userPicture">
                <img className="friendPicture" src={picture} alt="fotoDePerfil"/>
            </div>
            <div className="friendInfo">
              <h4>#1313</h4>
              <p>MenQueHueva</p>
            </div>
          </div>

          <div className="friendCard">
            <div className="userPicture">
                <img className="friendPicture" src={picture} alt="fotoDePerfil"/>
            </div>
            <div className="friendInfo">
              <h4>#1987</h4>
              <p>ElAbuelo</p>
            </div>
          </div>

          <div className="friendCard">
            <div className="userPicture">
                <img className="friendPicture" src={picture} alt="fotoDePerfil"/>
            </div>
            <div className="friendInfo">
              <h4>#6969</h4>
              <p>DuckBoi</p>
            </div>
          </div>

          <div className="friendCard">
            <div className="userPicture">
                <img className="friendPicture" src={picture} alt="fotoDePerfil"/>
            </div>
            <div className="friendInfo">
              <h4>#0123</h4>
              <p>Myself</p>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}