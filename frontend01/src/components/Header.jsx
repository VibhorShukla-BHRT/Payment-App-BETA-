export const Header = ({text,subhead})=>{
    return(
        <div className="flex-col bg-white p-2">
        <div className="flex justify-center font-bold text-2xl">
            {text}
        </div>
        <div className="flex justify-center font-extralight text-sm">{subhead}</div>
        </div>
    )
}