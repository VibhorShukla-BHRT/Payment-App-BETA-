import { useNavigate } from "react-router-dom";

export const UserRenderer = ({users})=>{
    const navigate = useNavigate();
    return <div className="divide-y mt-1">
        {users.map((user)=><Renderer key={user._id} user={user} navigate={navigate}/>)}
    </div>
    
}
function Renderer({user,navigate}){

    return <div className="flex justify-between items-center m-1">
    <div className="font-semibold rounded-lg w-10 h-10 flex justify-center items-center bg-slate-200">
    .*.
    </div>
    <div className="font-semibold">
        {user.firstName} {user.lastName}
    </div>
    <button
    onClick={()=>navigate('/transaction',{state: {user}})}
    className= "w-30 text-sm p-2 bg-green-500 text-black rounded-lg hover:bg-green-700">Send Money</button>

</div>
}