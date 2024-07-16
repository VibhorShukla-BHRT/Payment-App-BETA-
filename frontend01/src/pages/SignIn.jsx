import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { InpBox } from "../components/InputBox"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export const SigninPage = ()=>{
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const navigate = useNavigate();
    return (
        <div className='bg-gray-200 h-screen w-full flex justify-center items-center'>
        <div className="fill-none bg-white shadow-lg p-4 rounded-lg">
        <Header text={"Sign In"} subhead={"Sign-in to your account!"}/>
        <InpBox onChange={e=>{
    setEmail(e.target.value);
  }} label={"Email: "} desc={"example@gmail.com"}/>
        <InpBox onChange={e=>{
    setPass(e.target.value);
  }} label={"Password: "} desc={"akd376["}/>
        <button
        onClick={async()=>{
          try{
            const resp = await axios.post('https://payment-app-beta-u10o.onrender.com/api/v1/user/signin',{
              username: email,
              password: pass
            });
            localStorage.setItem("token",resp.data.token);
            alert(resp.data.message);
            navigate('/dashboard');
          } catch(err){
            alert("Sign-in failed! Please check your credentials and try again!")
          }
        }}
        className="bg-black rounded-md m-1 p-2 text-white font-medium w-full max-w-60">Sign in</button>
        <Footer label={"Don't have an account?"} linkText={"Sign-up"} link={"/signup"}/>
      </div>
      </div>
      )
}