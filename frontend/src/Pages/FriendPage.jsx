import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/Friends.css';
import SignOut from  '../components/Signout';
import logo from '../assets/Juan_Logo.svg';
import Modal from '../components/Modal';


export default function Profile() {
  const navigate = useNavigate();
  // access on cloud
  const url = 'https://juan-casino-backend.onrender.com'
  const urlExtension = '/friends'
  const [data, setData] = useState([])

  const token = localStorage.getItem("auth_token")
  const config = {
    headers: {
      'Authorization' : `Bearer ${token}`
    }
  }

  //set Modal params and show it. The params idea is for more customizable and reusable code
  const manageModal = (header, content, footer) =>{
      setModalParams({'header': header, 'content': content, 'footer': footer})
      setModalShow(true)        
  }

  //specific set form for game Modal
  const showModalGame = (user_id, user)=>{ //Show game info with Modal
  let header = <h2 className="modal-title">{user}</h2>
  let content = <p>{user} #{user_id}</p>
  let footer = <>
                  <button className="button" onClick={()=> setModalShow(false)} >Cerrar</button>
                  <a className="button" onClick={()=>console.log(`${game} no disponible`)}>Añadir</a> 
              </>
  manageModal(header, description, footer)
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
              <img alt="logo" src={logo} onClick={()=>navigate('/')}/>
              <h1 className='title'>Añade amigos</h1>
              <div id="user_bar">
                <SignOut/>
              </div>
          </nav>
      </header>

      <div className="friendAdd">
        <div className="searchBar">
            <form>
              <input
                placeholder='Buscar'
              />
            </form>
        </div>
        <div>
          {/* volver las tarjetas una función reutilizable*/}
          

        </div>

      </div>
    </>
  );
}