import React, { useEffect } from 'react'
import { FaHome, FaFileInvoiceDollar, FaCheckCircle, FaCog, FaPhone } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { NavLink, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import profileImage from '../../assets/image/default.png'
const SidebarItem = ({ icon, text, to }) => (
    // <div className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${active ? "bg-teal-500" : "hover:bg-gray-800"}`}> 
    //   {icon}
    //   <span>{text}</span>
    // </div>
    <NavLink 
    to={to} 
    className={({isActive}) => `flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition duration-300 active:scale-95 ${isActive ? "bg-teal-600" : "hover:bg-zinc-800"}`}
    >
     {icon} <span>{text}</span>
    </NavLink>
    
);

function Sidebar() {
  const { user, setUser, signout, getIncome, getExpense } = useGlobalContext();
  // const [savedUser, setSavedUser] = useState(null);


  const navigate = useNavigate();

  // useEffect(()=>{
  //   // getIncome();
  //   //local storage
  //   // console.log("user on sidebar::::", user)
  //   // if(user){
  //   //   localStorage.setItem("user", JSON.stringify(user))
  //   // }
    
  // },[])

  useEffect(()=>{
    const savedUser = localStorage.getItem("user")
    console.log("saveduser on sidebar::::", savedUser)

    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Ensure setUser function exists in your context
    }
  },[])
  
  // const curUser = user;
  // console.log("user on sidebar::::", user)

  const handleSignout = () => {
    signout();
    navigate('/');
  }
  return (
    <div className="bg-zinc-900 text-white w-64 min-h-screen p-4 flex flex-col justify-between">
    <div>
      <div className="flex items-center space-x-2 pb-4 border-b border-gray-700">
        <div className="w-12 h-12 bg-gray-500 rounded-full">
          <img className='rounded-full' src={`${profileImage}`} alt="user"  />
        </div>
        <span className="text-lg font-semibold">{user?.username || "Guest"}</span>
      </div>
      <nav className="mt-4 space-y-2">
        <SidebarItem icon={<MdDashboard />} text="Dashboard" to="/dashboard"/>
        <SidebarItem icon={<GiReceiveMoney />} text="Incomes" to="/income"/>
        <SidebarItem icon={<FaFileInvoiceDollar />} text="Expenses" to="/expense" />
      </nav>
    </div>
    <button
    onClick={handleSignout}
     className="text-center text-red-400 flex justify-center items-center gap-1 cursor-pointer hover:bg-zinc-800 rounded-xl mb-3 transition duration-300 active:bg-red-700 active:scale-95"> <IoLogOut/> sign out</button>
  </div>
  )
}

export default Sidebar;