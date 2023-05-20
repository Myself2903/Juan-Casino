import logo from '../assets/Juan_Logo.svg'
import DropdownMenu from '../components/DropdownMenu'
import Roulette from '../assets/Roulette/rulette.png'
import Selector from '../assets/Roulette/selector.png'
import BetBoard from '../assets/Roulette/BetTable.svg'
import axios from 'axios'
import { fetchToken } from '../Auth'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { getUsrImage } from '../Functions'
import '../styles/RoulettePage.css'

export default function RoulettePage(){
    const [usrImage, setUsrImage] = useState("");
    const token = fetchToken();
    let rouletteRef = useRef();
    const [color, setColor] = useState('');
    const [value, setValue] = useState(0);
    const [coins, setCoins] = useState(0);
    const [selectedCoins, setSelectedCoins] = useState(5)
    const [selectedNumbers, setSelectedNumbers] = useState({})
    const [selectedRows, setSelectedRows] = useState({})
    const [selectedCols, setSelectedCols] = useState({})
    const [half, setHalf] = useState({})
    const numericValues = useRef([])
    const rowDozen = useRef()
    const colDozen = useRef()
    const halfBoardBet = useRef()
    const refs = [numericValues, rowDozen, colDozen, halfBoardBet]
    const spinButton = useRef()

    /*
        Todo los que incluyen 18 números (negro, rojo, par, impar, primera mitad y segunda mitad) dan el doble de lo apostado
        Las columnas y las docenas dan tres veces lo apostado
        Y el número exacto da 36 veces lo apostado
    */

    useEffect(() => {
        const fetchUserImage = async () => {
          const image = await getUsrImage();
          setUsrImage(image);
        };
    
        fetchUserImage();
      }, []);


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

        setTimeout(()=>{
            const currentDeg = rotatedDeg%360 
            console.log(`grados actuales: ${currentDeg}°`);

            const final_result = getResult(currentDeg);
            setValue(final_result)

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
            for(let i=0; i<childs.length; i++){
                childs[i].style.visibility = 'visible'
            }
            numericValues.current.forEach(element => element.style.visibility = 'visible')
        },10000)
    }

    const genBetTableRow = () =>{
        let n = 36
        let rows = []
        for(let i = 1; i<=n; i+=3){
            rows.push((
                <tr>
                    <td  ref={el => numericValues.current = [...numericValues.current, el]} onClick={()=>handleBet(numericValues, selectedNumbers,setSelectedNumbers,i)} key={i}/>
                    <td ref={el => numericValues.current = [...numericValues.current, el]} onClick={()=>handleBet(numericValues, selectedNumbers, setSelectedNumbers, i+1)} key={i+1}/>
                    <td ref={el => numericValues.current = [...numericValues.current, el]} onClick={()=>handleBet(numericValues, selectedNumbers, setSelectedNumbers,i+2)} key={i+2}/>
                </tr>
            ))
        }
        return rows
    }

    const handleBet = (betRef, betArgs, setBetArgs, bet) =>{  
        for(let i = 0; i< refs.length; i++){
            if (refs[i] != betRef){
                if(refs[i] == numericValues){
                    numericValues.current.forEach(element => element.style.visibility = 'hidden')
                }else{
                    refs[i].current.style.visibility = 'hidden'
                }
            }
        }

        if(betArgs[bet]){
            setBetArgs({...betArgs, [bet]: betArgs[bet]+selectedCoins})
        }else{
            setBetArgs({...betArgs, [bet]: selectedCoins})
        }
    }

    const handleHalfBoardBet = (target, bet) =>{
        let childs = halfBoardBet.current.children 
        for(let i=0; i<childs.length; i++){
            if(childs[i] != target){
                childs[i].style.visibility = 'hidden'
            }
        }
        handleBet(halfBoardBet, half ,setHalf, bet )
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
                                    <tr ref={el => numericValues.current = [el]}><td colSpan={3} onClick={() =>handleBet(numericValues, selectedNumbers, setSelectedNumbers,0)}></td></tr>
                                    {genBetTableRow()}
                                    <tr ref={rowDozen}>
                                        <td onClick={()=>handleBet(rowDozen, selectedRows ,setSelectedRows, 1)}/>
                                        <td onClick={()=>handleBet(rowDozen, selectedRows, setSelectedRows, 2)}/>
                                        <td onClick={()=>handleBet(rowDozen, selectedRows, setSelectedRows, 3)}/>
                                    </tr>
                                </tbody>
                            </table>
                            <table className='generalBetBoardMaping'>
                                <tbody>
                                    <tr ref={colDozen}>
                                        <td colSpan={2} onClick={()=>handleBet(colDozen, selectedCols, setSelectedCols ,1)}></td>
                                        <td colSpan={2} onClick={()=>handleBet(colDozen, selectedCols, setSelectedCols, 12+1)}></td>
                                        <td colSpan={2} onClick={()=>handleBet(colDozen, selectedCols, setSelectedCols, 25)}></td>
                                    </tr>
                                    <tr ref={halfBoardBet}>
                                        <td onClick={e=>handleHalfBoardBet(e.target,1)}></td>
                                        <td onClick={e=>handleHalfBoardBet(e.target,2)}></td>
                                        <td onClick={e=>handleHalfBoardBet(e.target,3)}></td>
                                        <td onClick={e=>handleHalfBoardBet(e.target,4)}></td>
                                        <td onClick={e=>handleHalfBoardBet(e.target,5)}></td>
                                        <td onClick={e=>handleHalfBoardBet(e.target,6)}></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className='gameController'>
                    <div className='currentCoins'>
                        <h2 className='coins'>{coins}</h2>
                    </div>
                    <button className='button spinButton' ref={spinButton} onClick={spinRoulette}>Girar</button>
                </div>
            </main>
        </>
    )
}