import { useEffect, useState } from "react";

//components
import { useGlobalContext } from "../../context/GlobalContext";

import Sidebar from "../sidebar/Sidebar";
import Input from "../formItems/Input";
import Select from "../formItems/Select";
import Textarea from "../formItems/Textarea";

import { MdDelete } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";

export default function Income() {
  // const [incomes, setIncomes] = useState([]);
  const [incomeData, setIncomeData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "Salary",
    description: "",
  });

  const {
    income,
    setIncome,
    addIncome,
    getIncome,
    deleteIncome,
    error,
    setError,
    totalIncome,
  } = useGlobalContext();

  const handleChange = (e) => {
    setIncomeData({ ...incomeData, [e.target.name]: e.target.value });
    // console.log(incomeData)
  };

  const handleAddIncome = () => {
    if (incomeData.title && incomeData.amount && incomeData.date) {
      //   setIncomes([...incomes, incomeData]);
      console.log("incomedata::: ", incomeData);
      addIncome(incomeData);
      setError("");
    }
    console.log("income::::", income);
  };

  const handleDeleteIncome = (id) => {
    deleteIncome(id);
  };

  useEffect(() => {
    getIncome();
  }, []);

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-10 bg-black text-white">
        <h1 className="text-2xl font-semibold mb-6">New Income</h1>
        <div className="bg-zinc-800 p-2 mb-2 text-center rounded-xl">
          <h2 className="text-xl">Total Income: <span className="text-green-500">₹ {totalIncome()}</span></h2>
        </div>
        <div className="bg-zinc-900 p-6 rounded-lg flex gap-6">
          <div className="w-1/4">
            <Input
              label="Subject*"
              placeholder="Salary Title"
              name="title"
              value={incomeData.title}
              onChange={handleChange}
            />
            <div className="flex space-x-2">
              <Input
                label="Total*"
                type="number"
                placeholder="Salary Amount"
                name="amount"
                value={incomeData.amount}
                onChange={handleChange}
              />
            </div>
            <Input
              label="Date*"
              type="date"
              name="date"
              value={incomeData.date}
              onChange={handleChange}
            />
            <Select
              label="Category*"
              options={["Salary", "Investments", "Freelancing", "stocks", "Bitcoin", "Bank", "Other"]}
              name="category"
              placeholder="Enter"
              value={incomeData.category}
              onChange={handleChange}
            />
            <Textarea
              label="Description"
              placeholder="Enter details..."
              name="description"
              value={incomeData.description}
              onChange={handleChange}
            />
            
          </div>
          <div className="w-3/4 items-center justify-center border border-gray-600 p-10 rounded-lg overflow-auto max-h-[500px]">
            <ul>
              {!income || income.length === 0 ? (
                <li className="text-center py-2 bg-red-800 p-2 m-4 rounded-xl">
                  {error}
                </li>
              ) : (
                income.map((income, index) => (
                  <li
                    key={income._id}
                    className="flex justify-between items-center bg-zinc-800 p-4 m-4 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
                  >
                    <div className="flex-1">
                      <p className=" flex items-center font-semibold text-white text-lg">
                        <GoDotFill/> {income.title}
                      </p>
                      <p className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                        <FaCalendarAlt/>
                        {new Date(income.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        • {income.category}
                      </p>
                      {income.description && (
                        <div className="bg-gray-700 p-3 rounded-xl m-2">
                          <p className="flex items-center gap-1 text-sm text-gray-300">
                            <FaCommentDots/> {income.description}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-4">
                      <p className="font-bold text-green-500 text-lg">
                        +₹{income.amount}
                      </p>
                      <button
                        onClick={() => handleDeleteIncome(income._id)}
                        className="text-2xl cursor-pointer text-red-500 transition duration-300 hover:text-red-600 active:bg-gray-700 w-10 h-10 flex items-center justify-center rounded-full"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleAddIncome}
            className="bg-teal-600 px-4 py-2 rounded cursor-pointer transition duration-200 active:scale-95 active:bg-teal-700"
          >
            Add Income
          </button>
        </div>
      </div>
    </div>
  );
}
