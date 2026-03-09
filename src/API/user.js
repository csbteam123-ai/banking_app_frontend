import axios from "axios";
export const useCreate = (data) =>{
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, data)
}

export const userLogin = (data) =>{
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, data)
}

export const userExiest = token =>{
    return axios.get(`${import.meta.env.VITE_BACKEND_URL}/exiest`,{
        headers:{
            tokensend:token
        }
    })
}