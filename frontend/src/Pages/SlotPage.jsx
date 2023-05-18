import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/SlotPage.css';
import logo from '../assets/Juan_Logo.svg';


export default function SlotPage() {
  // const navigate = useNavigate();
  // const URL = import.meta.env.VITE_BASE_URL
  // const token = localStorage.getItem("auth_token")
  // const [userData, setuserData] = useState([])
  // const instance = axios.create({
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + token
  //   }
  // });


  // // useEffect for save userData at hook
  // useEffect(()=>{
  //   instance.get(URL+URLEXTENSION) //get query with token as a header config
  //   .then(response =>{
  //     const info = response.data
  //     setuserData({
  //       'iduser': info[0],
  //       'name': info[1],
  //       'surname': info[2],
  //       'username': info[3],
  //       'email': info[4],
  //       'birthdate': info[5],
  //       'picture': info[7]
  //     }) //store userData     
  //   })
  //   .catch(error =>{
  //     console.log("error: "+ error)
  //   })
  // },[])

  return (
    <>
      <header>
          <nav id="nav_content">
              <img alt="logo" src={logo} onClick={()=>navigate('/')}/>
              <h1 className='title'>Tragamonedas</h1>
              <div id="user_bar">
                {/* <SignOut/> */}
              </div>
          </nav>
      </header>

      <div className="slotGame">
        <div id="reels">
          <div id="slotReels">
            <img src="img/slot/Apple.png" id="fruit1" />
            <img src="img/slot/Apple.png" id="fruit2" />
            <img src="img/slot/Apple.png" id="fruit3" />
          </div>
          
          <div id="spinSlot">
            <p id="currentChips"><b>69.420.000</b></p>
            <img src="img/slot/spin.png" alt="spin" onclick="randomGenerate()" id="spin" />
          </div>
        </div>
        
        <div id="prizeBank">
          <img src="img/slot/sign_PRIZES.png" alt="premios" id="prizeSign" /><br/>
          <div id="prizeList">
            <div class="prize" id="mango"><p>Mango Mango Mango: 69</p></div>
            <div class="prize" id="grape"><p>&#127815;&#127815;&#127815;: 20</p></div>
            <div class="prize" id="apple"><p>&#127822;&#127822;&#127822;: 16</p></div>
            <div class="prize" id="orange"><p>&#127818;&#127818;&#127818;: 12</p></div>
            <div class="prize" id="lemon"><p>&#127819;&#127819;&#127819;: 8</p></div>
            <div class="prize" id="strawberry"><p>&#127827;&#127827;&#127827;: 6</p></div>
            <div class="prize" id="cherry"><p>&#127826;&#127826;&#127826;: 4</p></div>
            <div class="prize" id="strawberry2"><p>&#127827;&#127827;: 3</p></div>
            <div class="prize"id="cherry2"><p>&#127826;&#127826;: 2</p></div>
          </div>
        </div>
      </div>
    </>
  );
}