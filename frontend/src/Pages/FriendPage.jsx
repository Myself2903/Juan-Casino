  import { useNavigate } from "react-router";
  import { useState, useEffect, useRef} from "react";
  import axios from 'axios';
  import logo from '../assets/Juan_Logo.svg';
  import UserCard from "../components/UserCard";
  import '../styles/FriendsPage.css';
import { fetchToken } from "../Auth";
import DropdownMenu from "../components/DropdownMenu";

  export default function FriendPage() {
    const navigate = useNavigate();
    // access on cloud
    const url = 'https://juan-casino-backend.onrender.com'
    //test access
    // const url = 'http://127.0.0.1:8000'
    const urlExtension = '/users'
    const [data, setData] = useState([])
    const [userFound, setUserFound] = useState([])
    const [displayData, setDisplayData] = useState(false)
    const [query, setQuery] = useState("")
    const filteredData =  data.filter(item => {
      return String(item[1]).toLowerCase().includes(query.toLowerCase())
    })

    const token = fetchToken()

    const config = {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    }
    const searchBarRef = useRef(null)


    // useEffect for save data at hook
    useEffect(()=>{
      async function fetchData(){
        await axios.get(url+urlExtension, config) //get query with token as a header config
        .then(response =>{
          setData(response.data)
          console.log("data:") 
          console.log(data);
        })
        .catch(error =>{
          console.log("error: "+ error)
        })
      }
      fetchData()
    } , [])


    function onSubmit(e){
      e.preventDefault()
    }

    function showUserData(user){
      searchBarRef.current.value = ''
      setDisplayData(true)
      setQuery("")
      setUserFound({
        'iduser': user[0],
        'username': user[1],
        'birthdate': user[2],
        'picture': user[3]
        }
      )
    }

    return (
      <>
        <header>
            <nav className="nav_content">
                <img alt="logo" src={logo} onClick={()=>navigate('/')}/>
                <h1 className='title'>Añade amigos</h1>
                <DropdownMenu image={logo} />
            </nav>
        </header>

        <main className="searchSection">
          <div className="friendAdd">
                <form onSubmit={onSubmit}>
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
              {displayData ? 
                <UserCard params={userFound}/>
              :<></>}
            </div>
        </main>
        
      </>
    );
  }
