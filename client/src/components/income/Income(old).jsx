import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";

export default function Income() {
  const [incomes, setIncomes] = useState([]);
  const [incomeData, setIncomeData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "Salary",
    description: "",
  });

  const {income, setIncome, addIncome, getIncome, error} = useGlobalContext();

  const handleChange = (e) => {
    setIncomeData({ ...incomeData, [e.target.name]: e.target.value });
    // console.log(incomeData)
  };

  const handleAddIncome = () => {
    if (incomeData.title && incomeData.amount && incomeData.date) {
    //   setIncomes([...incomes, incomeData]);
    //   setIncomeData({ title: "", amount: "", date: "", category: "Salary", reference: "" });
    console.log("incomedata::: ", incomeData)
      addIncome(incomeData);
      seterror("");
    }
    console.log("income::::",income)
  };

  const handleGetIncome = () => {
    getIncome();
    console.log("handle get income::::",income);
  }

//   const totalIncome = incomes.reduce((acc, income) => acc + parseFloat(income.amount || 0), 0);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-8">
      {/* Total Income */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold">Total Income</h2>
        {/* <p className="text-3xl font-bold text-green-600">₹{totalIncome.toFixed(2)}</p> */}
      </div>

      {/* Income Form */}
      <div className="grid grid-cols-1 gap-4 p-4 bg-gray-100 rounded-lg">
        <input type="text" name="title" value={incomeData.title} onChange={handleChange} placeholder="Salary Title" className="p-2 border rounded w-full" />
        <input type="number" name="amount" value={incomeData.amount} onChange={handleChange} placeholder="Salary Amount" className="p-2 border rounded w-full" />
        <input type="date" name="date" value={incomeData.date} onChange={handleChange} className="p-2 border rounded w-full" />
        <select name="category" value={incomeData.category} onChange={handleChange} className="p-2 border rounded w-full">
          <option value="Salary">Salary</option>
          <option value="Freelance">Freelance</option>
          <option value="Investments">Investments</option>
        </select>
        <input type="text" name="description" value={incomeData.description} onChange={handleChange} placeholder="Add a description (Optional)" className="p-2 border rounded w-full" />
        <button onClick={handleAddIncome} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">Add Income</button>
        <button onClick={handleGetIncome} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">Get Income</button>
        {/* {
            error ? <p>error --- {error}</p> :
            income.map((item, i)=> (
              <li key={i}>{item}</li>
            ))
        } */}

        {
          !income || income.length === 0 ? <p>errors --- {error}</p> : income.map((item, i)=> (
            <li key={i}>{item.title}</li>
          ))
        }
      </div>

      {/* Available Incomes */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Available Incomes</h2>
        {income.length === 0 ? (
          <p className="text-gray-500">No incomes added yet.</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {income.map((income, index) => (
              <li key={index} className="flex justify-between py-2">
                <div>
                  <p className="font-medium">{income.title}</p>
                  <p className="text-sm text-gray-500">{income.date} - {income.category}</p>
                </div>
                <p className="font-bold text-green-600">+${income.amount}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}