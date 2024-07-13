export const Button = ({label,onClick})=>{
    return(
        <div className="flex justify-center items-center">
            <button onClick={onClick} className="bg-black rounded-md m-1 p-2 text-white font-medium w-full max-w-60">{label}</button>
        </div>
    )
}