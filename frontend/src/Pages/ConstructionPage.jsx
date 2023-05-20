import logo from '../assets/Juan_Logo.svg'
import construction from '../assets/construction.svg'
import masterBuilder from '../assets/JuanMaestroDeObra.svg'
import DropdownMenu from '../components/DropdownMenu'
import axios from 'axios'
import {getUsrImage} from '../Functions'
import { fetchToken } from '../Auth'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../styles/ConstructionPage.css'

export default function ConstructionPage(){
    
    const [usrImage, setUsrImage] = useState("")
    const token = fetchToken()
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserImage = async () => {
          const image = await getUsrImage();
          setUsrImage(image);
        };
    
        fetchUserImage();
      }, []);

    // setUsrImage(getUsrImage)
    return(
        <>
            <header>
                <nav className="nav_content">
                    <img alt="logo" className="logo" src={logo} />
                    <h1 className='title'>Página en Construcción</h1>
                    <DropdownMenu image={usrImage}/>
                </nav>
            </header>

            <main className='construction'>
                <img alt="construccion" src = {construction} className='constructionImage'/>
                <h1 className='pageConstructionMessage'>Página en construcción</h1>
                <img alt="maestro de obras" src={masterBuilder} className ='masterBuilderImage' />
            </main>
            
        </>
    )

}