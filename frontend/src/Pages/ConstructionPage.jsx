import logo from '../assets/Juan_Logo.svg'
import construction from '../assets/construction.svg'
import masterBuilder from '../assets/JuanMaestroDeObra.svg'
import DropdownMenu from '../components/DropdownMenu'
import axios from 'axios'
import { fetchToken } from '../Auth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../styles/ConstructionPage.css'

export default function ConstructionPage(){
    
    const [usrImage, setUsrImage] = useState("")
    const token = fetchToken()
    const navigate = useNavigate();

    if(token){
        async function getImg(){
            const URL = import.meta.env.VITE_BASE_URL
            const urlExtension = '/profile/getImage'
            await axios.get(URL+urlExtension, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : `Bearer ${token}`
                }
            })
            .then(response =>{
              setUsrImage(response.data)
            })
            .catch(error =>{
              console.log("error: "+error.response.data)
            })
        }
          getImg() 
    }

    return(
        <>
            <header>
                <nav className="nav_content">
                    <img alt="logo" src={logo} />
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