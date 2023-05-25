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
import DeleteUser from "../components/DeleteUser";

export default function Profile() {
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BASE_URL
  const URLEXTENSION = '/profile'
  const token = fetchToken()
  const [userData, setuserData] = useState([])
  const [userFriends, setUserFriends] = useState([])
  const [pendingRequests, setPendingRequests] = useState([])
  const [pendingRecieved, setPendingRecieved] = useState([])

  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });


  // useEffect for save userData at hook
  useEffect(()=>{
    instance.get(URL+URLEXTENSION) //get query with token as a header config
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
      instance.get(URL+URLEXTENSION+'/friends', {
        params:{
          iduser: userData['iduser']
        }
      }).then(response =>{
        setUserFriends(response.data)
        console.log(response.data)
      })
      instance.get(URL+URLEXTENSION+'/pendingFriends/sent', {
        
      }).then(response =>{
        setPendingRequests(response.data)
        console.log(response.data)
      })
      instance.get(URL+URLEXTENSION+'/pendingFriends/received', {
        
      }).then(response =>{
        setPendingRecieved(response.data)
        console.log(response.data)
      })
    }
  },[userData])

  const acceptFriendship = idfriendAccept=>{
    instance.post(URL + URLEXTENSION + "/friends/accept", {idfriendAccept})
    .then(response =>{ console.log(response); reload()  })
    .catch(err => console.log("error: " + err))
    window.location.reload(false);
  }

  const deleteFriend = idfriendDelete=>{
    instance.delete(URL + URLEXTENSION + "/friends/delete", {data: idfriendDelete})
    .then(response =>{ console.log(response); reload()  })
    .catch(err => console.log("error: " + err))
    window.location.reload(false);
  }
    //window.location.reload(false);

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
          <DeleteUser/>
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
            <div className="friendsGrid">
              {userFriends.map((friend) => (
                    <UserCard params={{
                      'iduser': friend[0],
                      'username': friend[1],
                      'birthdate': friend[2],
                      'picture': friend[3],
                      'areFriends': <button className= "button friendRemove" onClick={()=> deleteFriend(friend[0])}>Eliminar amigo</button>
                      }}/>)
                  )}
                  {/*<UserCard params={}/>*/}
            </div>
          }

          <button className="button" onClick={()=>navigate('/friends')}>Añadir amigos</button>

          <div className="requests">
            <div className="sentRequests">
              <h2>Solicitudes enviadas</h2>
              {pendingRequests.length == 0 ? <>
              <h3>No hay solicitudes pendientes</h3>
              </> : 
                  <div>
                    {pendingRequests.map(item => (
                        <div key={item[0]} className="requestData">
                          <img className="userImage" src= {item[3]} alt="user image"/>
                          {item[1]}<label className="userID">#{item[0]}</label>
                          <button className="deny" onClick={() => deleteFriend(item[0])}>Eliminar</button>
                        </div>
                    ))}
                  </div>
                }
            </div>

            <div className="incomingRequests">
              <h2>Solicitudes recibidas</h2>
              {pendingRecieved.length == 0 ? <>
                <h3>No hay solicitudes pendientes</h3>
              </> : 
                  <div>
                    {pendingRecieved.map(item => (
                        <div key={item[0]} className="requestData">
                          <img className="userImage" src= {item[3]} alt="user image"/>
                          {item[1]}<label className="userID">#{item[0]}</label>
                          <button className="confirm" onClick={() => acceptFriendship(item[0])}>Aceptar</button> {/* onClick={() => acceptRequest(item[0])} */}
                          <button className="deny" onClick={() => deleteFriend(item[0])}>Eliminar</button>
                        </div>
                    ))}
                  </div>
                }
            </div>
          </div>
          </div>
      </main>
    </>
  );
}