import {useLocation, Navigate} from 'react-router-dom'

export const fetchToken = () =>{
    const token = localStorage.getItem('auth_token'); // obtiene el token almacenado en localStorage

    if (!token) {
      return null; // No hay token almacenado en localStorage
    }
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = new Date(decodedToken.exp * 1000); // Convertir expiración UNIX timestamp a fecha
  
      if (expirationDate < new Date()) {
        // Token ha expirado, eliminar del localStorage
        localStorage.removeItem('auth_token');
        return null;
      }
  
      return token; // Token válido
    } catch (error) {
      // Error al decodificar el token, eliminar del localStorage
      localStorage.removeItem('auth_token');
      return null;
    }
}

export function RequireToken({children}){
    let auth = fetchToken() //obtiene token actual del usuario
    let location = useLocation()    //

    if(!auth){
        return <Navigate to = '/' state = {{from: location}} /> // si no existe token, el usuario no esta logeado,
    }                                                       // por lo que lo redirige a / (pagina principal) y manda como state la locacion actual
    
    return children //contenido que se va a renderizar dentro del componente
}