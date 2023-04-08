import { useNavigate } from "react-router-dom"

export default function Register(){
    const navigate = useNavigate();
    
    return(
        <div className="registerPage">
            <h2>Register page</h2>
            <button className="button" onClick={()=>navigate("/")}> Regresar </button>
        </div>
    )
}