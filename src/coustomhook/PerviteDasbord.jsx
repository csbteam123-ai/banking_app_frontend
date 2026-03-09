import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { userExiest } from "../API/user";

const PerviteDasbord = ({ children }) => {
  const token = localStorage.getItem("token");
  const [istoken, setistoken] = useState(null);
  if (!token) return <Navigate to="/login" />;
  useEffect(()=>{
    const fn = async ()=>{
      try {
        const res = await userExiest(token)
        if(res.data?.user){
          return setistoken(true)
        }
      } catch (error) {
        return setistoken(false)
      }
    }
    fn();
  },[token])

  if(istoken === null) return <div>Loading...</div>


  return istoken ? children : <Navigate to="/login" />;
};

export default PerviteDasbord;
