import axios from "axios"



export const Request_money = (cus_name,cus_email,amount,token) =>{
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}/payment/request/add/money`,{
        cus_name,
        cus_email,
        amount
    
    },
    {
        headers: {
            'tokensend': `${token}`
        }
    })
}