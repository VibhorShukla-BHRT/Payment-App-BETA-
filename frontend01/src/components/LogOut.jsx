import { useNavigate } from "react-router-dom";

export const LogOutButton = ()=>{
    const navigate = useNavigate();
    return <button 
    onClick={()=>{
        localStorage.removeItem("token");
        navigate('/signin');
    }}
    className="rounded-lg bg-black text-white font-sm pl-1 pr-1">Log-out</button>
}