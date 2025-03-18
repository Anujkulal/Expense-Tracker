import React from 'react'
import { FaHome, FaFileInvoiceDollar, FaCheckCircle, FaCog, FaPhone } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ icon, text, to }) => (
    // <div className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${active ? "bg-teal-500" : "hover:bg-gray-800"}`}> 
    //   {icon}
    //   <span>{text}</span>
    // </div>
    <NavLink 
    to={to} 
    className={({isActive}) => `flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${isActive ? "bg-teal-500" : "hover:bg-gray-800"}`}
    >
     {icon} <span>{text}</span>
    </NavLink>
    
);

function Sidebar() {
  return (
    <div className="bg-zinc-900 text-white w-64 min-h-screen p-4 flex flex-col justify-between">
    <div>
      <div className="flex items-center space-x-2 pb-4 border-b border-gray-700">
        <div className="w-12 h-12 bg-gray-500 rounded-full"></div>
        <span className="text-lg font-semibold">Anuj Kulal</span>
      </div>
      <nav className="mt-4 space-y-2">
        <SidebarItem icon={<FaHome />} text="Home" to="/"/>
        <SidebarItem icon={<GiReceiveMoney />} text="Incomes" to="/income"/>
        <SidebarItem icon={<FaFileInvoiceDollar />} text="Expenses" to="/expense" />
      </nav>
    </div>
    <div className="text-center text-gray-400 text-sm">sign out</div>
  </div>
  )
}

export default Sidebar;