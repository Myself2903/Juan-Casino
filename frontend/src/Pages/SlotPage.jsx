import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import '../styles/SlotPage.css';
import logo from '../assets/Juan_Logo.svg';
import apple from '../assets/Slots/Apple.svg';
import lemon from '../assets/Slots/Lemon.svg';
import cherry from '../assets/Slots/Cherry.svg';
import orange from '../assets/Slots/Orange.svg';
import strawberry from '../assets/Slots/Strawberry.svg';
import mango from '../assets/Slots/Mango.svg';

import drumRoll from '../assets/Slots/timpaniroll.ogg';
import applause from '../assets/Slots/applause.ogg';
import sigh from '../assets/Slots/sigh.ogg';
import failed from '../assets/Slots/coin_freeball_denied.ogg';
import coin from '../assets/Slots/Coin.ogg';


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

  //Slot logic
  const fruits = [apple, strawberry, lemon, cherry, orange, strawberry, cherry, mango]
  const totalFruits = 8;
  var chips = 200;
  const fruit1Ref = useRef(null);
  const fruit2Ref = useRef(null);
  const fruit3Ref = useRef(null);
  //Audio
  const drumRollRef = useRef(null);
  const applauseRef = useRef(null);
  const sighRef = useRef(null);
  const coinRef = useRef(null);
  const failedRef = useRef(null);
  /*const playSound = () =>{
    if(audio1Ref.current){
      audio1Ref.current.play();
    }
  }*/

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
            chips += 16;
          break;
          case lemon:
            chips += 8;
          break;
          case cherry:
            chips += 4;
          break;
          case orange:
            chips += 12;
          break;
          case strawberry:
            chips += 6;
          break;
          case mango:
            chips += 24;
          break;
        }
      }else if(suspense == true){
        switch(result2){
          case cherry:
            applauseRef.current.play();
            chips += 2;
          break;
          case strawberry:
            applauseRef.current.play();
            chips += 3;
          break;
          default:
            sighRef.current.play();
          break;
        }
      }else{
        switch(result2){
          case cherry:
            if(result2 == result3){
              applauseRef.current.play();
              chips += 2;
            }else{
              failedRef.current.play();
            }
          break;
          case strawberry:
            if(result2 == result3){
              applauseRef.current.play();
              chips += 3;
            }else{
              failedRef.current.play();
            }
          break;
          default:
            failedRef.current.play();
          break;
        }
      }
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
              <div id="user_bar">
                {/* <SignOut/> */}
              </div>
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

        <div id="reels">
          <div id="slotReels">
            <img src={apple} id="fruit1" ref={fruit1Ref}/>
            <img src={apple} id="fruit2" ref={fruit2Ref}/>
            <img src={apple} id="fruit3" ref={fruit3Ref}/>
          </div>
          
          <div id="spinSlot">
            <p id="currentChips"><b>69.420.000</b></p>
            {/*<img src="img/slot/spin.png" alt="spin" onclick={() => spinReels()} id="spin" />*/}
            <button onClick={spinReels} className='button'>Spin</button>
          </div>
        </div>
        
        <div id="prizeBank">
          <h1 className='title'>Premios</h1><br/>
          <div id="prizeList">
            <div class="prize" id="mango"><p>Mango Mango Mango: 24</p></div>
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