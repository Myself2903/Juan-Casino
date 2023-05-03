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
  // const url = 'https://juan-casino-backend.onrender.com'
  //test access
  const url = 'http://127.0.0.1:8000'
  const urlExtension = '/profile'
  const token = localStorage.getItem("auth_token")
  const [userData, setuserData] = useState([])
  const [userFriends, setUserFriends] = useState([])
  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });


  // useEffect for save userData at hook
  useEffect(()=>{
    instance.get(url+urlExtension) //get query with token as a header config
    .then(response =>{
      const info = response.data
      setuserData({
        'iduser': info[0],
        'name': info[1],
        'surname': info[2],
        'username': info[3],
        'email': info[4],
        'birthdate': info[5],
        'picture': info[7]
      }) //store userData     
    })
    .catch(error =>{
      console.log("error: "+ error)
    })
  },[])
  
  useEffect(()=>{
    instance.get(url+urlExtension+'/friends', {
      params:{
        iduser: userData['iduser']
      }
    }).then(response =>{
      setUserFriends(response.data)
      console.log(response.data)
    })
  },[userData])

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

        <div className="userCardContainer">
          <UserCard params={userData} /> 
        </div>
        <button className="button">Editar</button>

        <div className="friendsTittle">
          <h2>Amigos:</h2>
        </div>
        
        <div className="friendSpace">
          {userFriends.length == 0 ?
            <div className="noFriends">
              <h3>No hay amigos que mostrar...</h3>
              <img id="sadHorse" src={man} alt="caballo triste" />
            </div>
            :
            <p>i do have friends c:</p>
          }

          <div className="friends">

          </div>
            <button className="button" onClick={()=>navigate('/friends')}>Añadir amigos</button>
          </div>
      </div>
    </>
  );
}