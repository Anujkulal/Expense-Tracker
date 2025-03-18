import React from 'react'

function Input({ label, type = "text", placeholder, name, value, onChange}) {
  return (
    <div className="mb-4">
      {/* <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label> */}
      <input type={type} placeholder={placeholder} className="w-full p-2 bg-zinc-700 rounded-xl text-white" name={name} value={value} onChange={onChange}/>
    </div>
  )
}

export default Input;