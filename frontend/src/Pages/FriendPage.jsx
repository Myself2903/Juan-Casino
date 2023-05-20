  import { useNavigate } from "react-router";
  import { useState, useEffect, useRef} from "react";
  import axios from 'axios';
  import logo from '../assets/Juan_Logo.svg';
  import UserCard from "../components/UserCard";
  import '../styles/FriendsPage.css';
  import { fetchToken } from "../Auth";
  import DropdownMenu from "../components/DropdownMenu";
  import Loading from "../components/Loading";
  import { getUsrImage } from '../Functions'

  export default function FriendPage() {
    const navigate = useNavigate();
    const URL = import.meta.env.VITE_BASE_URL
    const URLEXTENSION = '/profile'
    const [showLoading, setShowLoading] = useState(false) //loading screen
    const [usrImage, setUsrImage] = useState("")
    const [data, setData] = useState([])
    const [userFound, setUserFound] = useState([])
    const [displayData, setDisplayData] = useState(false)
    const [query, setQuery] = useState("")
    const filteredData =  data.filter(item => {
      return String(item[1]).toLowerCase().includes(query.toLowerCase())
    })

    const token = fetchToken()

    const instance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });    
    
    const searchBarRef = useRef(null)


    // useEffect for save data at hook
    useEffect(()=>{
      async function fetchData(){
        await instance.get(URL+"/users") //get query with token as a header config
        .then(response =>{
          setData(response.data)
          console.log("data:") 
          console.log(data);
        })
        .catch(error =>{
          console.log("error: "+ error)
        })
      }

      const fetchUserImage = async () => {
        const image = await getUsrImage();
        setUsrImage(image);
      };
  
      fetchUserImage();
      fetchData()
    } , [])


    function onSubmit(e){
      e.preventDefault()
    }

    function hideUserData(){
      setDisplayData(false)
    }

    async function showUserData(user){
      await instance.get(URL+URLEXTENSION+"/areFriends",{
          params: {
            iduser: user[0]
          }
        })
        .then(response =>{
          searchBarRef.current.value = ''
          setDisplayData(true)
          setQuery("")
          let areFriends
          if(response.data){
            areFriends =  <div className="areFriendsContainer">
                            <p className="areFriends"> ¡Ya son amigos!</p>
                            <button className= "button friendRemove" onClick={()=> deleteFriend(user[0])}>Eliminar amigo</button>
                          </div> 
          }
          else{ areFriends = <button className="button friendRequest" onClick={() => addFriend(user[0])}>Agregar amigo</button> }

          setUserFound({
            'iduser': user[0],
            'username': user[1],
            'birthdate': user[2],
            'picture': user[3],
            'areFriends': areFriends
            }
          )
          
        })
        .catch(error =>{
          console.log("error: "+error)
        })
    }

    const addFriend = iduserRequested =>{
      // console.log(iduser)
      setShowLoading(true)
      instance.post(URL+URLEXTENSION+"/friends/new", { iduserRequested })
        .then(response => {
          console.log(response.data)
          navigate("/profile")
        })
        .catch(error => {
          console.error(error.response.data)
        });
        setShowLoading(false)
    }


    const deleteFriend = idfriendDelete=>{
      instance.delete(URL + URLEXTENSION + "/friends/delete", {data: idfriendDelete})
      .then(response =>{ console.log(response); navigate("/profile")  })
      .catch(error => console.log("error: " + error))
    }
    

    return (
      <>
        <header>
            <nav className="nav_content">
                <img alt="logo" src={logo} className="logo" onClick={()=>navigate('/')}/>
                <h1 className='title'>Añade amigos</h1>
                <DropdownMenu image={usrImage} />
            </nav>
        </header>

        <main className="searchSection">
          <div className="friendAdd">
                <Loading
                    show = {showLoading}
                    onClose = {() => {
                    setShowLoading(false)
                  }}
                />
                <form onSubmit={onSubmit} className="searchBar">
                  <input
                    value={query}
                    onChange= {e => setQuery(e.target.value)}
                    placeholder='Buscar'
                    type = "search"
                    className = "searchBar"
                    ref={searchBarRef}
                  />
                </form>
                {query == "" || filteredData.length == 0 ? <></> : 
                  <div className="userData">
                    {filteredData.map(item => (
                        <div key={item[0]} onClick={()=> showUserData(item)}>
                          <img className="userImage" src= {item[3]} alt="user image"/>
                          {item[1]}<label className="userID">#{item[0]}</label>
                        </div>
                    ))}
                  </div>
                }
            
          </div>
          <div className="userFound">
              {displayData ? <UserCard params={userFound}/> : <></>}
            </div>
        </main>
        
      </>
    );
  }
