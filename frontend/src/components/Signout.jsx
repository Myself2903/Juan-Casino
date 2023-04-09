import { useNavigate } from "react-router-dom";


export default function Signout (){

    const navigate = useNavigate()
    
    //signOut Function
    //remove token and token type from locale storage
    const signOut = () =>{    
        localStorage.removeItem("auth_token") 
        localStorage.removeItem("auth_token_type")
        navigate("/");
    }

    return <button className='button' onClick={signOut}>cerrar sesión</button>
};