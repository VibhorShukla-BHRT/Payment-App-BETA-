import {User} from "../components/User"
import {SearchBar} from "../components/SearchBar"
import {UserRenderer} from "../components/UserRenderer"
import axios from "axios";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { LogOutButton } from "../components/LogOut";
export const DashboardPage = ()=>{
  const [users,setUsers]  = useState([]);
  const [balance,setBalance] = useState(0);
  const [inp,setInp] = useState("");
  const [cur,setCur] = useState([]);
  const token = localStorage.getItem("token");
  const decoded = decodeToken(token);

  useEffect(()=>{
  const fetchBalance = async()=>{
    try{
      const resp = await axios.get("https://payment-app-beta-2.onrender.com/api/v1/account/balance",{
        headers:{
          'Authorization': "Bearer "+localStorage.getItem("token")
        }
      });
      setBalance(resp.data.balance);
    } catch(error){
      console.log("Error fetching balance: "+error);
    }
  }
  fetchBalance();
  },[]);
  useEffect(()=>{
    const fetchUsers = async ()=>{
      try{
        const resp = await axios.get(`https://payment-app-beta-2.onrender.com/api/v1/user/bulk?filter=${inp}`);
        const finalUsers = resp.data.user;
        setCur(finalUsers.filter(user=>user._id===decoded.id));
        setUsers(finalUsers.filter(user=>user._id!=decoded.id));
      }catch(err){
        console.log("error: "+err);
      }
    }
    fetchUsers();
  },[inp]);
  return (
    <div className="bg-gradient-to-r from-blue-300 to-blue-500">
    <div className="flex justify-between shadow-lg items-center p-2">
      <div className="font-semibold text-xl">Payment Application</div>
      <User userName={
        (cur.length==0)?"User":cur[0].firstName
      }/>
    </div>
    <div className="font-semibold ml-2 flex justify-between items-center">
      Your Balance: ₹ {balance.toFixed(2)}
    <LogOutButton/>
    </div>
    <SearchBar setInp={setInp}/>
    <UserRenderer users={users}/>
    </div>
    
  )
}