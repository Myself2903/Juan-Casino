import logo from '../assets/Juan_Logo.svg'
import DropdownMenu from '../components/DropdownMenu'
import Roulette from '../assets/Roulette/rulette.png'
import Selector from '../assets/Roulette/selector.png'
import BetBoard from '../assets/Roulette/BetTable.svg'
import axios from 'axios'
import chipBlue from '../assets/Chips/chip_blue.svg'
import chipGreen from '../assets/Chips/chip_green.svg'
import chipOrange from '../assets/Chips/chip_orange.svg'
import chipPurple from '../assets/Chips/chip_purple.svg'
import chipRed from '../assets/Chips/chip_red.svg'
import chipYellow from '../assets/Chips/chip_yellow.svg'
import { fetchToken } from '../Auth'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import { getUsrImage } from '../Functions'
import '../styles/RoulettePage.css'

export default function RoulettePage(){
    const [usrImage, setUsrImage] = useState("");
    const token = fetchToken();
    let rouletteRef = useRef();
    const URL = import.meta.env.VITE_BASE_URL
    const [color, setColor] = useState('');
    const [value, setValue] = useState(0);
    const [coins, setCoins] = useState(0);
    const [selectedCoins, setSelectedCoins] = useState(1)
    const [bet, setBet] = useState({})
    const [betType, setBetType] = useState(-1)
    
    const NUMBERBET = {TYPE:0};
    const DOZENBET = {TYPE:1, FIRST12: 0, SECOND12: 1, THIRD12: 2, FIRSTROW: 3, SECONDROW: 4, THIRDROW: 5};    
    const HALFBOARDBET = {TYPE:2, FIRST18: 0, EVEN:1, REDCOLOR:2, BLACKCOLOR:3, ODD:4, LAST18:5};

    const numericValues = useRef([])
    const rowDozen = useRef()
    const colDozen = useRef()
    const halfBoardBet = useRef()
    const refs = [numericValues, rowDozen, colDozen, halfBoardBet]
    const spinButton = useRef()

    const chips = {1: chipRed, 5: chipBlue, 10: chipYellow, 25: chipGreen, 50: chipPurple, 100: chipOrange}

    /*
        Todo los que incluyen 18 números (negro, rojo, par, impar, primera mitad y segunda mitad) dan el doble de lo apostado
        Las columnas y las docenas dan tres veces lo apostado
        Y el número exacto da 36 veces lo apostado
    */

    /* chip value
            Rojo = 1
            Azul = 5
            Amarillo = 10
            Verde = 25
            Morado = 50
            Naranja = 100
    */

    useEffect(() => {
        const fetchUserImage = async () => {
          const image = await getUsrImage();
          setUsrImage(image);
        };
        
        const getUserCoins = async() =>{
            await axios.get(URL+'/profile/coins', {  headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }})
              .then(response => setCoins(response.data))
              .catch(error => console.log(error))
        }

        getUserCoins()
        fetchUserImage();
      }, []);

    // valores ordenados de la ruleta
    const values = [26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14,
                    20, 1, 33, 16, 24, 5, 10, 23, 8, 30, 11, 36,
                    13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32, 0]
    
    const section_deg = 360/37;

    const getResult = rotation =>{
        const value = values[Math.floor(rotation/section_deg)]
        console.log("value:" + value);
        return value; //obtiene la posicion a evaluar dependiendo del angulo de rotacion de la rueda
        //redondea hacia abajo para evaluar la condicion de menor que.
    }

    const spinRoulette = ()=>{
        rowDozen.current.style.visibility = 'hidden';
        colDozen.current.style.visibility = 'hidden';
        numericValues.current.forEach(element => element.style.visibility = 'hidden')
        let childs = halfBoardBet.current.children 
        for(let i=0; i<childs.length; i++){
            childs[i].style.visibility = 'hidden'
        }
        

        const rotatedDeg = Math.floor(5000 + Math.random() * 5000);

        spinButton.current.style.pointerEvents = "none";
        const rouletteElement = rouletteRef.current;
        rouletteElement.style.transition = "all 10s ease";
        rouletteElement.style.transform = `rotate(${rotatedDeg}deg)`;

        console.log(`grados rotados: ${rotatedDeg}°`)
        const currentDeg = rotatedDeg%360 
        console.log(`grados actuales: ${currentDeg}°`);

        const final_result = getResult(currentDeg);
        setValue(final_result)

        console.log(betType)
        console.log(bet)
        

        switch(betType){
            case NUMBERBET.TYPE:
                for(const betValue in bet){
                    if(betValue == final_result){
                        console.log(`ganaste con el numero: ${final_result}`)
                    }
                }
                
                break;
            
            case DOZENBET.TYPE:
                if (DOZENBET.FIRST12 in bet || DOZENBET.SECOND12 in bet || DOZENBET.THIRD12 in bet){
                    
                    const resultDozen = Math.floor((final_result-1)/12);
                    for(const betValue in bet){
                        console.log("Betvalue: "+betValue+" resultDozen: "+resultDozen)
                        if(betValue == resultDozen){
                            console.log(`ganaste con el numero: ${final_result}`)
                            break;
                        }
                    }
                    break;

                }else{
                    const rowDozen =  Math.floor((final_result)%3);
                    for(const betValue in bet){
                        console.log("Betvalue: "+betValue+" rowDozen: "+rowDozen)
                        if((betValue+1)%3 == rowDozen){
                            console.log(`ganaste con el numero: ${final_result}`)
                            break;
                        }
                    }
                    break;
                }
            
            case HALFBOARDBET.TYPE:
                console.log("entered")
                // console.log(typeof(Object.keys(bet)[0]))
                switch(parseInt(Object.keys(bet)[0])){
                    case HALFBOARDBET.FIRST18:
                        console.log("entered first18")
                        if(1<=final_result && final_result <=18){console.log(`ganaste con el numero: ${final_result}`)}
                        break;
                        
                    case HALFBOARDBET.EVEN:
                        console.log("entered even")
                        if(!(final_result%2)){console.log(`ganaste con el numero: ${final_result}`)}
                        break;
                    
                    case HALFBOARDBET.REDCOLOR:
                        console.log("entered redcolor")
                        if(values.indexOf(final_result)%2){console.log(`ganaste con el numero: ${final_result}`)}
                        break;
                    
                    case HALFBOARDBET.BLACKCOLOR:
                        console.log("entered blackcolor")
                        if(!(values.indexOf(final_result)%2)){console.log(`ganaste con el numero: ${final_result}`)}
                        break;

                    case HALFBOARDBET.ODD:
                        console.log("entered odd")
                        if(final_result%2){console.log(`ganaste con el numero: ${final_result}`)}
                        break;

                    case HALFBOARDBET.LAST18:
                        console.log("entered last18 ")
                        if(19<=final_result && final_result <=36){console.log(`ganaste con el numero: ${final_result}`)}
                        break;
                    default:
                        console.log("Ninguno")
                        break;
                }

        }

        setTimeout(()=>{


            let color
            if(final_result == 0){
                color = "Verde";
            }else if(values.indexOf(final_result)%2){ // si el elemento es par en la lista de elementos de la rueda, entonces es rojo, si no, como no es 0 entonces es negro.
                color = "Rojo";
            }else{
                color = "Negro";
            }
            setColor(color)
            console.log(`color: ${color}`)

            spinButton.current.style.pointerEvents = "auto";
            rouletteElement.style.transition = "none";    
            rouletteElement.style.transform = `rotate(${currentDeg}deg)`;
            spinButton.current.style.pointerEvents = "auto";

            rowDozen.current.style.visibility = 'visible';
            colDozen.current.style.visibility = 'visible';
            halfBoardBet.current.style.visibility = 'visible';
            numericValues.current.forEach(element => element.style.visibility = 'visible')
            for(let i=0; i<childs.length; i++){
                childs[i].style.visibility = 'visible'
            }

            setBet({})
            setBetType(-1)
            
        },10000)
    }

    const genBetTableRow = () =>{
        let n = 36
        let rows = []
        for(let i = 1; i<=n; i+=3){
            rows.push((
                <tr>
                    <td ref={el => numericValues.current = [...numericValues.current, el]} onClick={(e)=>handleBet(numericValues, NUMBERBET.TYPE, i, e.target)} key={i}> {betType == NUMBERBET.TYPE && bet[i] ? bet[i]['chips']: ''}</td>
                    <td ref={el => numericValues.current = [...numericValues.current, el]} onClick={(e)=>handleBet(numericValues, NUMBERBET.TYPE, i+1, e.target)} key={i+1}> {betType == NUMBERBET.TYPE && bet[i+1] ? bet[i+1]['chips']: ''} </td>
                    <td ref={el => numericValues.current = [...numericValues.current, el]} onClick={(e)=>handleBet(numericValues, NUMBERBET.TYPE, i+2, e.target)} key={i+2}> {betType == NUMBERBET.TYPE && bet[i+2] ? bet[i+2]['chips']: ''} </td>
                </tr>
            ))
        }
        return rows
    }

    const genChips = () =>{
        let generatedChips = []
        const keys = Object.keys(chips)
        
        for(let i = 0; i < keys.length; i++){
            generatedChips.push((
                <div className={`chipContainer ${selectedCoins == keys[i] ? 'currentChip' : ''}`} onClick={() => setSelectedCoins(parseInt(keys[i]))}>
                    <img src={chips[keys[i]]} alt={`chip con valor ${keys[i]}`} className='chipImage'/>
                    <p>{keys[i]}</p>
                </div>
            ))
        }

        return generatedChips
    }

    const handleBet = (betRef, selectedBetType, betValue, target) =>{        
        if(betType == -1){
            for(let i = 0; i< refs.length; i++){
                if (refs[i] != betRef){
                    if(refs[i] == numericValues){
                        numericValues.current.forEach(element => element.style.visibility = 'hidden')
                    }else if(refs[i] == halfBoardBet){
                        let childs = halfBoardBet.current.children 
                        for(let i=0; i<childs.length; i++){
                            childs[i].style.visibility = 'hidden'
                        }
                    }
                    else{
                        refs[i].current.style.visibility = 'hidden'
                    }
                }
            }
            setBetType(selectedBetType)
        }

        if(bet[betValue]){
            setBet({...bet, [betValue]: {value: bet[betValue]["value"]+selectedCoins, chips: genChipBet(bet[betValue]["value"]+selectedCoins, 100)}})
        }else{
            setBet({...bet, [betValue]: {value: selectedCoins, chips: genChipBet(selectedCoins, 100)}})
        }
    }

    const handleHalfBoardBet = (target, bet) =>{
        if(betType == -1){
            let childs = halfBoardBet.current.children 
            for(let i=0; i<childs.length; i++){
                if(childs[i] != target){
                    childs[i].style.visibility = 'hidden'
                }
            }
        }    
        handleBet(halfBoardBet, HALFBOARDBET.TYPE , bet, target)
    }

    const genChipBet = (amount, verify) => {        
        let generatedChips = []
        console.log(amount, verify)
        
        if(verify == 1){
            for(let i = 0; i<amount; i++){
                generatedChips.push((
                    <img src={chips[1]} alt="apuesta de 1 moneda" className='betChip' 
                    style={{ position: 'absolute', top: `${Math.floor(Math.random()*51 )}%`, left: `${Math.floor(Math.random()*71)}%` }}
                    />
                ))
            }
        }else{
            let check = Math.floor(amount/verify)
            // console.log(check)
            if (check > 0){
                for(let i = 0; i<check; i++){
                    generatedChips.push((
                        <img src={chips[verify]} alt={`apuesta de ${verify} monedas`} className='betChip'
                        style={{ position: 'absolute', top: `${Math.floor(Math.random()*51 )}%`, left: `${Math.floor(Math.random()*71)}%` }}
                        />
                    ))
                }
            }
            if(amount%verify != 0){
                switch(verify){
                    case 100:
                    case 50:
                    case 10:
                        generatedChips.push(genChipBet(amount-check*verify, verify/2))
                        break;
                    
                    case 25:
                        generatedChips.push(genChipBet(amount-check*verify, 10))
                        break;

                    case 5:
                        generatedChips.push(genChipBet(amount-check*verify, 1))
                        break;
                    
                    default:
                        break;
                }
                
            }
        }

        return generatedChips
    }

    return (
        <>
            <header>
                <nav className="nav_content">
                    <img alt="logo" className="logo" src={logo} />
                    <h1 className='title'>Ruleta</h1>
                    <DropdownMenu image={usrImage}/>
                </nav>
            </header>
            <main className='roulette_game'>
                <div className='roulette_info'>
                    <div className='roulette_container'>
                        <img alt="selector" className='selector' src = {Selector}/>
                        <img alt="ruleta" src={Roulette} className='rulette' ref =  {rouletteRef}/>
                    </div>
                    <div className='bet_table_container'>
                        <img src={BetBoard} alt={"tablero de apuestas" } className='betBoard'/>
                        <div className='boardMap'>
                            <table className='betBoardMaping'>
                                <tbody>
                                    <tr ref={el => numericValues.current = [el]}>
                                        <td colSpan={3} onClick={() =>handleBet(numericValues, NUMBERBET.TYPE,0)}>
                                            {betType == NUMBERBET.TYPE && bet[0] ? bet[0]['chips']: ''}
                                        </td>
                                    </tr>
                                    {genBetTableRow()}
                                    <tr ref={rowDozen}>
                                        <td onClick={(e)=>handleBet(rowDozen, DOZENBET.TYPE, DOZENBET.FIRSTROW,e.target)}>
                                            {betType == DOZENBET.TYPE && bet[DOZENBET.FIRSTROW] ? bet[DOZENBET.FIRSTROW]['chips']: ''}
                                        </td>
                                        <td onClick={(e)=>handleBet(rowDozen, DOZENBET.TYPE, DOZENBET.SECONDROW,e.target)}> 
                                            {betType == DOZENBET.TYPE && bet[DOZENBET.SECONDROW] ? bet[DOZENBET.SECONDROW]['chips']: ''}
                                        </td>
                                        <td onClick={(e)=>handleBet(rowDozen, DOZENBET.TYPE, DOZENBET.THIRDROW,e.target)}>
                                            {betType == DOZENBET.TYPE && bet[DOZENBET.THIRDROW] ? bet[DOZENBET.THIRDROW]['chips']: ''}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className='generalBetBoardMaping'>
                                <tbody>
                                    <tr ref={colDozen}>
                                        <td colSpan={2} onClick={(e)=>handleBet(colDozen, DOZENBET.TYPE, DOZENBET.FIRST12,e.target)}>
                                            {betType == DOZENBET.TYPE && bet[DOZENBET.FIRST12] ? bet[DOZENBET.FIRST12]['chips']: ''}
                                        </td>
                                        <td colSpan={2} onClick={(e)=>handleBet(colDozen, DOZENBET.TYPE, DOZENBET.SECOND12,e.target)}>
                                            {betType == DOZENBET.TYPE && bet[DOZENBET.SECOND12] ? bet[DOZENBET.SECOND12]['chips']: ''}
                                        </td>
                                        <td colSpan={2} onClick={(e)=>handleBet(colDozen, DOZENBET.TYPE, DOZENBET.THIRD12,e.target)}>
                                            {betType == DOZENBET.TYPE && bet[DOZENBET.THIRD12] ? bet[DOZENBET.THIRD12]['chips']: ''}
                                        </td>
                                    </tr>
                                    <tr ref={halfBoardBet}>
                                        <td onClick={e=>handleHalfBoardBet(e.target, HALFBOARDBET.FIRST18)}>
                                            {betType == HALFBOARDBET.TYPE && bet[HALFBOARDBET.FIRST18] ? bet[HALFBOARDBET.FIRST18]['chips']: ''}
                                        </td>
                                        <td onClick={e=>handleHalfBoardBet(e.target, HALFBOARDBET.EVEN)}>
                                            {betType == HALFBOARDBET.TYPE && bet[HALFBOARDBET.EVEN] ? bet[HALFBOARDBET.EVEN]['chips']: ''}    
                                        </td>
                                        <td onClick={e=>handleHalfBoardBet(e.target, HALFBOARDBET.REDCOLOR)}>
                                            {betType == HALFBOARDBET.TYPE && bet[HALFBOARDBET.REDCOLOR] ? bet[HALFBOARDBET.REDCOLOR]['chips']: ''}
                                        </td>
                                        <td onClick={e=>handleHalfBoardBet(e.target, HALFBOARDBET.BLACKCOLOR)}>
                                            {betType == HALFBOARDBET.TYPE && bet[HALFBOARDBET.BLACKCOLOR] ? bet[HALFBOARDBET.BLACKCOLOR]['chips']: ''}
                                        </td>
                                        <td onClick={e=>handleHalfBoardBet(e.target, HALFBOARDBET.ODD)}>
                                            {betType == HALFBOARDBET.TYPE && bet[HALFBOARDBET.ODD] ? bet[HALFBOARDBET.ODD]['chips']: ''}
                                        </td>
                                        <td onClick={e=>handleHalfBoardBet(e.target, HALFBOARDBET.LAST18)}>
                                            {betType == HALFBOARDBET.TYPE && bet[HALFBOARDBET.LAST18] ? bet[HALFBOARDBET.LAST18]['chips']: ''}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className='gameController'>

                    <div className="chipSelector">
                        {genChips()}
                    </div>
                    <div className='currentCoins'>
                        <h2 className='coins'>{coins}</h2>
                    </div>
                    <button className='button spinButton' ref={spinButton} onClick={spinRoulette}>Girar</button>
                </div>
            </main>
        </>
    )
}