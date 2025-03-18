import axios from 'axios';
import { useState, createContext, useContext, useEffect } from 'react';
// import Cookies from 'js-cookie';

const server_transaction_url = 'http://localhost:3000/api/v1';
const server_user_url = 'http://localhost:3000/user/auth';

axios.defaults.withCredentials = true;

export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);
    const [error, setError] = useState(null);
    const [tokenVal, setTokenVal] = useState(null);
    const [authMessage, setAuthMessage] = useState(null);
    const [myuser, setMyUser] = useState(null);

    //signup user
    const signUp = async (user) => {
        // console.log("User Data Being Sent:", user); 
        try{
            const response = await axios.post(`${server_user_url}/signup`, user);
            console.log("response:::",response.data);
            setAuthMessage(response.data.message);
            // setUser(user);
        } catch(error){
            console.log(error.response?.data?.message);
            setError(error.response?.data?.message);
        }
    }

    const signIn = async (user) => {
        try{
            const response = await axios.post(`${server_user_url}/signin`, user, {withCredentials: true});
            console.log("signin response:::",response.data);
            if(!response) {
                console.log("Invalid credentials", error.response?.data?.message);
                return setError("Invalid credentials");
            }
        //     const token = Cookies.get("token");
        // if (token) {
        //   setMyUser({ token });
        // }
        // console.log("Token:::", token);
            console.log("signin data from context:::",response.data.message);
            setAuthMessage(response.data.message);
            setUser(response.data.user);
            setTokenVal(response.data.token);
        } catch(error){
            console.log("eerror",error.response?.data?.message);
            setError(error.response?.data?.message);
        }
    }

    const logout = async () => {  // No need to pass `user`
        try {
            const response = await axios.post(`${server_user_url}/logout`, {}, { withCredentials: true }); // Send an empty object
            console.log("logout:::", response.data);
            setAuthMessage(response.data.message);
            setUser(null);
        } catch (error) {
            console.log(error.response?.data?.message);
            setError(error.response?.data?.message || "Logout failed");
        }
    };
    

    const getIncome = async () => {
        try {
            const response = await axios.get(`${server_transaction_url}/get-income`)
            // console.log("getIncome response:::", response);

            if(!response || !response.data || response.data.length === 0){
                console.log("Failed to fetch incomes");
                return setError(err.response?.data?.error || "Failed to fetch incomes");
            }

            // console.log("error response:::", error);
            setIncome(response.data);
            setError(null);
            console.log("response data:::",response.data);

        } catch (err) {
            setError(err.response?.data?.message || "Income Not Found!");
            console.log("error response:::", error);
            setIncome([]);
        }
    };

    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${server_transaction_url}/add-income`, income);
            console.log("response:::", response.data);
            getIncome();
        } catch(error){
            setError(error.response?.data?.message || "Failed to add income");
        }
    }

    const deleteIncome = async (id) => {
        try{
            const response = await axios.delete(`${server_transaction_url}/delete-income/${id}`);
            console.log("response:::", response.data.message);
            getIncome();
        } catch(error){
            setError(error.response?.data?.message || "Failed to delete income");
        }
    }

    const getExpense = async () => {
        try {
            const response = await axios.get(`${server_transaction_url}/get-expense`);
            // console.log("getExpense response:::", response);

            if(!response || !response.data || response.data.length === 0){
                console.log("Failed to fetch Expense");
                return setError(err.response?.data?.error || "Failed to fetch Expense");
            }

            setExpense(response.data);
            setError(null);
            console.log("response data:::",response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Expense Not Found!");
            console.log("error response:::", error);
            setExpense([]);
        }
    };

    const addExpense = async (expense) => {
        try {
            const response = await axios.post(`${server_transaction_url}/add-expense`, expense);
            console.log("response:::", response.data);
            getExpense();
        } catch(error){
            setError(error.response?.data?.message || "Failed to add expense");
        }
    }

    const deleteExpense = async (id) => {
        try{
            const response = await axios.delete(`${server_transaction_url}/delete-expense/${id}`);
            console.log("response:::", response.data);
            getExpense();
        } catch(error){
            setError(error.response?.data?.message || "Failed to delete expense");
        }
    }

    const totalIncome = () => income.reduce((total, income) => total + income.amount, 0);

    const totalExpense = () => expense.reduce((total, expense) => total + expense.amount, 0);

    const transactionHistory = () => {
        return [...income, ...expense]
            .slice() // Prevent mutation
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3);
    };

    return (
        <GlobalContext.Provider value={{
            user,
            setUser,
            income,
            expense,
            error,
            setError,
            signUp,
            signIn,
            logout,
            getIncome,
            addIncome,
            deleteIncome,
            getExpense,
            addExpense,
            deleteExpense,
            totalIncome,
            totalExpense,
            transactionHistory,
            authMessage,
            tokenVal,
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}