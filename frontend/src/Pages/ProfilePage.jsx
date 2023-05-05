import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/ProfilePage.css';
import logo from '../assets/Juan_Logo.svg';
import man from '../assets/JuanTriste.svg';
import Edit from '../components/EditUser';
import UserCard from "../components/UserCard";
import DropdownMenu from "../components/DropdownMenu"
import { fetchToken } from "../Auth";

export default function Profile() {
  const navigate = useNavigate();
  // access on cloud
  const url = 'https://juan-casino-backend.onrender.com'
  //test access
  // const url = 'http://127.0.0.1:8000'
  const urlExtension = '/profile'
  const token = fetchToken()
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
      localStorage.removeItem('auth_token');
      navigate("/")
    })
  },[])
  
  useEffect(()=>{
    if(userData.length != 0){
      instance.get(url+urlExtension+'/friends', {
        params:{
          iduser: userData['iduser']
        }
      }).then(response =>{
        setUserFriends(response.data)
        console.log(response.data)
      })
    }
  },[userData])

  return (
    <>
      <header>
          <nav className="nav_content">
              <img alt="logo" src={logo} onClick={()=>navigate('/')} className="logo"/>
              <h1 className='title'>Perfil de usuario</h1>
              <DropdownMenu image={userData.picture}/>
          </nav>
      </header>

      <main className="profilePage">
        
        <h2>Tarjeta de usuario</h2>

        <div className="userCardContainer">
          <UserCard params={userData} /> 
        </div>
        <div className="editButton">
          <Edit/>
        </div>

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
      </main>
    </>
  );
}