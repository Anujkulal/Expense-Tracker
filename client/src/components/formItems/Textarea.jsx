import React from "react";

function Textarea({ label, placeholder, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <textarea
      value={value}
      onChange={onChange}
      name={name}
        placeholder={placeholder}
        className="w-full h-32 p-2 bg-zinc-700 rounded-xl text-white resize-none"
      ></textarea>
    </div>
  );
}

export default Textarea;
