import { useState } from "react"
import { Button } from "../components/Button"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { InpBox } from "../components/InputBox"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export const SignUpPage = ()=>{
  const [fn,setFn] = useState("");
  const [ln,setLn] = useState("");
  const [email,setEmail] = useState("");
  const [pass,setPass] = useState("");
  const navigate = useNavigate();
  return (
  <div className='bg-slate-200 h-screen w-full flex justify-center items-center'>
  <div className="bg-white shadow-lg p-4 rounded-lg">
  <Header text={"Sign-Up"} subhead={"Create your own account!"}/>
  <InpBox label={"First Name: "} desc={"Vibhor"} onChange = {e=>{
    setFn(e.target.value);
  }}/>
  <InpBox label={"Last Name: "} desc={"Shukla"} onChange = {e=>{
    setLn(e.target.value);
  }}/>
  <InpBox label={"Email: "} desc={"example@gmail.com"} onChange = {e=>{
    setEmail(e.target.value);
  }}/>
  <InpBox label={"Password: "} desc={"akd376["} onChange = {e=>{
    setPass(e.target.value);
  }}/>
  <Button onClick={async ()=>{
    const resp = await axios.post("http://localhost:3000/api/v1/user/signup",{
      username: email,
      firstName: fn,
      lastName: ln,
      password: pass
    });
    alert(resp.data.message);
    if(!resp.data.token){
      return;
    }
    localStorage.setItem("token",resp.data.token);
    navigate('/dashboard');
  }
  } label={"Sign up"} />
  <Footer label={"Already have an account?"} linkText={"login"} link={"/signin"}/>
</div>
</div>
)
}