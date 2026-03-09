import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userExiest } from "../../API/user";
import { setUser } from "../UserSlice";

const Userslice = () => {
  const navigate = useNavigate();
  const user = useSelector((state)=>state.Calluser.user)
  const dispatch  = useDispatch()

  const token = localStorage.getItem("token");

  if (!token) {
    return navigate("/login");
  }
  useEffect(() => {
    const fn= async()=>{
        const res = await userExiest(token)
        console.log(res)
        if(res.data?.userData){
           dispatch(setUser(res.data.userData))
        }
    }
    fn()
  },[token]);
};

export default Userslice;
