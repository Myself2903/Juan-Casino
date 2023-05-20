import axios from 'axios'
import { fetchToken } from './Auth'
import { useState } from 'react'

export const getUsrImage = async ()=>{
    const token = fetchToken()  
    if(token){
        const URL = import.meta.env.VITE_BASE_URL
        const urlExtension = '/profile/getImage'
        try {
            const response = await axios.get(`${URL}${urlExtension}`, {  headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }});
            return response.data;
        }catch (error) {
            // Manejar el error de la petición
            console.error(error);
            throw error;
        }
    }
}