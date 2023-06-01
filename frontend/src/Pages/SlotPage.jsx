import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import '../styles/SlotPage.css';
import logo from '../assets/Juan_Logo.svg';
import { fetchToken } from "../Auth";
import { getUsrImage } from '../Functions'
import DropdownMenu from '../components/DropdownMenu';
import Loading from '../components/Loading'
//<a href="https://www.vecteezy.com/free-vector/fruit-icon">Fruit Icon Vectors by Vecteezy</a>
import apple from '../assets/Slots/Apple.svg';
import lemon from '../assets/Slots/Lemon.svg';
import cherry from '../assets/Slots/Cherry.svg';
import orange from '../assets/Slots/Orange.svg';
import strawberry from '../assets/Slots/Strawberry.svg';
import watermelon from '../assets/Slots/Watermelon.svg';
import grapes from '../assets/Slots/Grapes.svg';

import drumRoll from '../assets/Slots/timpaniroll.ogg';
import applause from '../assets/Slots/applause.ogg';
import sigh from '../assets/Slots/sigh.ogg';
import failed from '../assets/Slots/coin_freeball_denied.ogg';
import coin from '../assets/Slots/Coin.ogg';


export default function SlotPage() {
   const navigate = useNavigate();
   const URL = import.meta.env.VITE_BASE_URL
   const URLEXTENSION = '/profile'
   const [showLoading, setShowLoading] = useState(false) //loading screen
   const token = localStorage.getItem("auth_token")
   const [enoughChips, setEnoughChips] = useState(true)
   const [spining, setSpining] = useState(false);
   const [chips, changeChips] = useState(0);
   const [usrImage, setUsrImage] = useState("")
   const instance = axios.create({
     headers: {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + token
     }
   });

  useEffect(() =>{
    if(!token){
      navigate("/")
    }

    const fetchUserImage = async () => {
      const image = await getUsrImage();
      setUsrImage(image);
    };
    fetchUserImage();

    instance.get(URL+URLEXTENSION+"/coins")
    .then(response =>{
      const info = response.data
      changeChips(info[0]); 
    })
    .catch(error =>{
      console.log("error: "+ error)
      changeChips(0);
    })
  }, [])

  //Slot logic
  const fruits = [apple, strawberry, lemon, cherry, orange, strawberry, cherry, watermelon, grapes]
  const totalFruits = 9;
  let reward = 0;
  let bet = 2;
  const fruit1Ref = useRef(null);
  const fruit2Ref = useRef(null);
  const fruit3Ref = useRef(null);
  const prizeRef = useRef(null);

  //bruteforces loading all images
  useEffect(() =>{
    setSpining(true);
    setShowLoading(true);
    let reel1 = 9;
    let rnd1 = 0;
    let rotate1 = setInterval(function(){
      fruit1Ref.current.src = fruits[rnd1];
      if(reel1 == 0){
        fruit1Ref.current.src = fruits[rnd1];
        clearInterval(rotate1);
        setShowLoading(false);
        setSpining(false);
        fruit1Ref.current.src = apple;
      }
      rnd1++;
      reel1--;
    }, 800);
  }, [])

  //Posible prizes
  /*const melonRef = useRef(null);
  const grapeRef = useRef(null);
  const appleRef = useRef(null);
  const orangeRef = useRef(null);
  const lemonRef = useRef(null);
  const strawberryRef = useRef(null);
  const cherryRef = useRef(null);
  const strawberry2Ref = useRef(null);
  const cherry2Ref = useRef(null);*/
  //Audio
  const drumRollRef = useRef(null);
  const applauseRef = useRef(null);
  const sighRef = useRef(null);
  const coinRef = useRef(null);
  const failedRef = useRef(null);

  const chipChecks = () =>{
    setSpining(true);
    if(chips < 2){
      setEnoughChips(false);
      failedRef.current.play();
      setSpining(false);
    }else{
      changeChips(chips - 2);
      reward = 0;
      spinReels();
      }
  }

  const spinReels = () =>{
    coinRef.current.play();
    //suspense
    let suspense = false;
    //time for reels
    let reel1 = 19;
    let reel2 = 25;
    let reel3 = 31;
    // random numbers
    let rnd1 = Math.floor(Math.random() * totalFruits);
    let rnd2 = Math.floor(Math.random() * totalFruits);
    let rnd3 = Math.floor(Math.random() * totalFruits);
    // results
    let result1 = apple;
    let result2 = lemon;
    let result3 = cherry;
    //first reel
    let rotate1 = setInterval(function(){
      rnd1++;
      if(rnd1 > totalFruits - 1){rnd1 = 0}
      fruit1Ref.current.src = fruits[rnd1];
      if(reel1 == 0){
        rnd1 = Math.floor(Math.random() * totalFruits);
        fruit1Ref.current.src = fruits[rnd1];
        result1 = fruits[rnd1];
        clearInterval(rotate1);
      }
      reel1--;
  }, 100);
  // second reel
  let rotate2 = setInterval(function(){
    rnd2++;
    if(rnd2 > totalFruits - 1){rnd2 = 0}
    fruit2Ref.current.src = fruits[rnd2];
    if(reel2 == 0){
      rnd2 = Math.floor(Math.random() * totalFruits);
      fruit2Ref.current.src = fruits[rnd2];
      result2 = fruits[rnd2];
      clearInterval(rotate2);
    }
    reel2--;
  }, 100);
  //third reel
  let rotate3 = setInterval(function(){
    rnd3++;
    if(rnd3 > totalFruits - 1){rnd3 = 0}
    fruit3Ref.current.src = fruits[rnd3];
    //checks if reel 1 & 2 are the same fruit
    if(suspense == false && reel3 == 1 && result1 == result2){
      drumRollRef.current.play();
      reel3 = 18;
      suspense = true;
    }
    if(reel3 == 0){
      rnd3 = Math.floor(Math.random() * totalFruits);
      fruit3Ref.current.src = fruits[rnd3];
      result3 = fruits[rnd3];
      clearInterval(rotate3);
      // prize awarding
      if(suspense == true && result2 == result3){
        applauseRef.current.play();
        switch (result3){
          case apple:
            reward = 16;
          break;
          case lemon:
            reward = 8;
          break;
          case cherry:
            reward = 4;
          break;
          case orange:
            reward = 12;
          break;
          case strawberry:
            reward = 6;
          break;
          case watermelon:
            reward = 24;
          break;
          case grapes:
            reward = 20;
            break;
          default:
            console.log("Ha ocurrido un error inesperado");
            break;
        }
        setSpining(false);
      }else if(suspense == true){
        switch(result2){
          case cherry:
            applauseRef.current.play();
            reward = 2;
          break;
          case strawberry:
            applauseRef.current.play();
            reward = 3;
          break;
          default:
            sighRef.current.play();
          break;
        }
        setSpining(false);
      }else{
        switch(result2){
          case cherry:
            if(result2 == result3){
              applauseRef.current.play();
              reward = 2;
            }else{
              failedRef.current.play();
            }
          break;
          case strawberry:
            if(result2 == result3){
              applauseRef.current.play();
              reward = 3;
            }else{
              failedRef.current.play();
            }
          break;
          default:
            failedRef.current.play();
          break;
        }
      }
      instance.put(URL+URLEXTENSION+"/updateCoins", {bet, reward})
        .then(response =>{
        console.log(response);
      })
      .catch(error =>{
        console.log("error: "+ error)
        switch(error.response.status){
          case 403:
            failedRef.current.play();
            changeChips(0);
            break;
          default:
            break;
        }
      })
      console.log(chips);
      changeChips(chips - bet + reward);
      setSpining(false);
    }
    reel3--;
  }, 100);
  }

  return (
    <>
      <header>
          <nav className="nav_content">
              <img alt="logo" src={logo} onClick={()=>navigate('/')}/>
              <h1 className='title'>Tragamonedas</h1>
              <DropdownMenu image={usrImage}/>
          </nav>
      </header>

      <div className="slotGame">
        <audio ref={drumRollRef}>
          <source src={drumRoll}/>
          Tu navegador no admite la reproducción de audio
        </audio>
        <audio ref={sighRef}>
          <source src={sigh}/>
        </audio>
        <audio ref={applauseRef}>
          <source src={applause}/>
        </audio>
        <audio ref={coinRef}>
          <source src={coin}/>
        </audio>
        <audio ref={failedRef}>
          <source src={failed}/>
        </audio>
        <Loading
            show = {showLoading}
                    onClose = {() => {
                    setShowLoading(false)
                }}
            />

        <div id="reels">
          <div id="slotReels">
            <img src={apple} className="fruitReel" ref={fruit1Ref}/>
            <img src={apple} className="fruitReel" ref={fruit2Ref}/>
            <img src={apple} className="fruitReel" ref={fruit3Ref}/>
          </div>
          
          <div id="spinSlot">
            <p className="currentCoins"><b className="coins">{chips}</b></p>
            {/*<img src="img/slot/spin.png" alt="spin" onclick={() => spinReels()} id="spin" />*/}
            <button onClick={chipChecks} disabled={spining} className='spinButton'>GIRAR</button>
          </div>
          {enoughChips ? (
            <p></p>
            ) : (
            <p className="noChips">No tienes suficientes fichas</p>
          )}
        </div>
        
        <div id="prizeBank">
          <h1 className='title'>Premios</h1><br/>
          <div id="prizeList">
            <div className="prize"><p>&#127817;&#127817;&#127817;: 24</p></div>
            <div className="prize"><p>&#127815;&#127815;&#127815;: 20</p></div>
            <div className="prize"><p>&#127822;&#127822;&#127822;: 16</p></div>
            <div className="prize"><p>&#127818;&#127818;&#127818;: 12</p></div>
            <div className="prize"><p>&#127819;&#127819;&#127819;: 8</p></div>
            <div className="prize"><p>&#127827;&#127827;&#127827;: 6</p></div>
            <div className="prize"><p>&#127826;&#127826;&#127826;: 4</p></div>
            <div className="prize"><p>&#127827;&#127827;: 3</p></div>
            <div className="prize"><p>&#127826;&#127826;: 2</p></div>
          </div>
        </div>
      </div>
    </>
  );
}