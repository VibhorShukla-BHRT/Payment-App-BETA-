import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../components/Header"
import axios from "axios";
import { useState } from "react";

export const TransactionPage = ()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;
    const [amount,setAmt] = useState(0);
    if(!user){
        return <div>User Not found</div>
    }
    return(
        <div className="flex justify-center items-center h-screen bg-slate-200">
        <div className="shadow-lg p-3 w-full max-w-72 h-full max-h-72 bg-white rounded-lg">
            <Header text={"Transaction To"} />
            <div className="flex justify-start flex-col mt-3">
            <div className="flex items-center">
                <div className="rounded-full mr-2 font-medium text-white w-10 flex justify-center items-center p-2 bg-green-500">
                    {user.firstName[0]}
                </div>
                <div className="font-bold">
                    {user.firstName} {user.lastName}
                </div>
            </div>
            <div className="font-medium text-sm">
                Amount(in ₹):
            </div>
            <input 
            type="text"
            onChange={e=>setAmt(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mb-2" 
             placeholder="Enter amount" />
            </div>
            <button
             onClick={()=>{
                axios.post("http://localhost:3000/api/v1/account/transfer",
                    {
                        amt:amount,
                        to:user._id
                    }
                    ,{
                    headers:{
                        'Authorization': "Bearer "+localStorage.getItem("token")
                    }
                }).then(resp=>{
                    alert(resp.data.message)
                    setTimeout(()=>{navigate('/dashboard')},100);
                });
             }}
             className="bg-green-500 w-full max-w-100 text-white font-medium p-2 rounded-lg">Transfer</button>
        </div>
        </div>
    )
}