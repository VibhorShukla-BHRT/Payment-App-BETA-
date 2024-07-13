export const InpBox = ({label,desc,onChange})=>{
    return <div>
        <div className="font-medium">
            {label}
        </div>
      <input type="text" 
      onChange={onChange}
      className="border border-gray-300 rounded-md p-2 shadow-sm w-full max-w-sm" 
      placeholder={`${desc}`}/>
    </div>
}