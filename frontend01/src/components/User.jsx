export const User = ({
    userName
})=>{
    const initial = userName[0];
    return <div>
        <a className="flex items-center" href="userProfileLink">
            <div className="m-2 font-semibold">Namaste, {userName}!</div>
            <button className="rounded-full w-10 h-10 flex bg-black text-white items-center justify-center font-semibold">{initial}</button>
        </a>
        
    </div>
}