import React from "react";
import Sidebar from "../sidebar/Sidebar";

// function Home() {
//   return (
//     <div className='flex w-full h-screen bg-gray-100'>
//         <Sidebar/>
//       <h1>This is a home page</h1>
//     </div>
//   )
// }

// export default Home

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../../context/GlobalContext";

// const data = [
//   { name: "Jan", income: 500, expenses: 300 },
//   { name: "Feb", income: 700, expenses: 400 },
//   { name: "Mar", income: 800, expenses: 450 },
//   { name: "Apr", income: 600, expenses: 350 },
//   { name: "May", income: 900, expenses: 500 },
// ];



export default function Home() {
  const { income, expense, getIncome, getExpense, totalIncome, totalExpense, transactionHistory } = useGlobalContext();

  const [...history] = transactionHistory();
  console.log("Transaction History:::", history);
  

  const incomeData = income.map((income, index) => {
    return { date: income.date, income: income.amount };
  })

  const expensesData = expense.map((expense, index) => {
    return { date: expense.date, expenses: expense.amount };
  })
  // [
  //   { date: "2024-01-07", expenses: 300 },
  //   { date: "2024-02-12", expenses: 400 },
  //   { date: "2024-03-18", expenses: 450 },
  //   { date: "2024-04-22", expenses: 350 },
  // ];

  console.log("Income Data:::", incomeData);
  console.log("Expense Data:::", expensesData);
  
  // Merge data while ensuring unique dates and filling missing values
  const allDates = [...new Set([...incomeData.map(d => d.date), ...expensesData.map(d => d.date)])];
  
  // console.log(allDates);
  
  const mergedData = allDates.map(date => ({
    date,
    income: incomeData.find(d => d.date === date)?.income || null,
    expenses: expensesData.find(d => d.date === date)?.expenses || null,
  }));
  
  // Sort by date
  mergedData.sort((a, b) => new Date(a.date) - new Date(b.date));
  // console.log(mergedData);
  
  useEffect(() => {
    getIncome();
    getExpense();
  }, [])
  
  // useEffect(()=>{
  //   console.log("Income:::", income); 
  //   console.log("Expense:::", expense);

  // },[])

  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="w-full flex-1 p-10 flex-col gap-6 bg-black">
        <div className="flex gap-2 m-6 w-full justify-center">
          {[
            { title: "Total Income", value: `₹${totalIncome()}`, color: "text-green-600" },
            { title: "Total Expenses", value: `₹${totalExpense()}`, color: "text-red-600" },
            { title: "Total Balance", value: `₹${totalIncome() - totalExpense()}`, color: "text-blue-600" },
          ].map((box, index) => (
            <div
              key={index}
              className="p-4 m-2 w-1/4 shadow-lg  rounded-lg text-center bg-zinc-800"
            >
              <h2 className="text-lg font-semibold text-white">{box.title}</h2>
              <p className={`text-2xl font-bold ${box.color}`}>{box.value}</p>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-wrap gap-4 justify-evenly">
          {/* Graph for Transactions */}
          <div className="md:w-2/3 w-full min-w-[300px] p-4 shadow-lg  rounded-lg bg-zinc-800 text-white">
            <h2 className="text-lg  font-semibold mb-2">Transaction Trends</h2>
            {/* <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#4CAF50" strokeWidth={2} />
                <Line type="monotone" dataKey="expenses" stroke="#F44336" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer> */}
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mergedData}>
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip />
                <Legend /> {/* Add legend */}
                <Line type="monotone" dataKey="income" stroke="#4CAF50" strokeWidth={2} name="Income" connectNulls />
                <Line type="monotone" dataKey="expenses" stroke="#F44336" strokeWidth={2} name="Expenses" connectNulls/>
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Transactions */}
          <div className="md:w-1/4 w-full min-w-[300px] p-4 shadow-lg  rounded-lg bg-zinc-800 text-white">
            <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
            <ul>
              { history.length === 0 ? 
              <li className="text-center py-2 bg-red-800 p-2 m-4 rounded-xl">No Transactions</li> :
              history.map((item, index) => (
                <li key={index} className={`flex justify-between py-2 text-lg`}>
                  {item.title} <span className={`${item.type === "expense" ? "text-red-600": "text-green-600"}`}> {item.type === "expense" ? "-" : "+"} ₹{item.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
