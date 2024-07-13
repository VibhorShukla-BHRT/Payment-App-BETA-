import { Link } from "react-router-dom"

export const Footer=({label,linkText,link})=>{
    return <div className="flex justify-center items-center ">
        <div className="p-2">
            {label}
        </div>
        <Link className="pr-4 underline underline-offset-1" to={link}>
            {linkText}
        </Link>
    </div>
}