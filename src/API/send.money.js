import axios from "axios";

export const sendMoney = async (senderid,ammount,token) => {
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}/send/money/${senderid}`,{ammount},{
        headers: {
            'tokensend': `${token}`
        }
    })
}

export const getTransaction = async (token) => {
    return axios.get(`${import.meta.env.VITE_BACKEND_URL}/get/transaction`,{
        headers: {
            'tokensend': `${token}`
        }
    })
}