import React from 'react'

function Select({ label, options, name, value, onChange }) {
  return (
    <div className="mb-4">
    <select className="w-full p-2 bg-zinc-700 rounded-xl text-white" name={name} value={value} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  </div>
  )
}

export default Select;