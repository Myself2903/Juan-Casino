import {useLocation, Navigate} from 'react-router-dom'

// export const setToken = token =>{
//     localStorage.setItem('temitope', token) //guarda informacion al navegador con la key 'temitope'
// }

export const fetchToken = token =>{
    return localStorage.getItem('auth_token') // obtiene la key generada con la funcion anterior
}

export function RequireToken({children}){
    let auth = fetchToken() //obtiene token actual del usuario
    let location = useLocation()    //

    if(!auth){
        return <Navigate to = '/' state = {{from: location}} /> // si no existe token, el usuario no esta logeado,
    }                                                       // por lo que lo redirige a / (pagina principal) y manda como state la locacion actual
    
    
    return children //contenido que se va a renderizar dentro del componente
}