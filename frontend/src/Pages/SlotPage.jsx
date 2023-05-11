import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/SlotPage.css';
import SignOut from  '../components/Signout';
import logo from '../assets/Juan_Logo.svg';


export default function slot() {
  const navigate = useNavigate();
  // access on cloud
  const url = 'https://juan-casino-backend.onrender.com'
  //test access
  // const url = 'http://127.0.0.1:8000'
  const urlExtension = '/profile/coins'
  const token = localStorage.getItem("auth_token")
  const [userData, setuserData] = useState([])
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

  return (
    <>
      <header>
          <nav id="nav_content">
              <img alt="logo" src={logo} onClick={()=>navigate('/')}/>
              <h1 className='title'>Tragamonedas</h1>
              <div id="user_bar">
                <SignOut/>
              </div>
          </nav>
      </header>

      <div className="profilePage">
        <p>bruh</p>
      </div>
    </>
  );
}