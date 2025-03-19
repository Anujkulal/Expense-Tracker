import axios from 'axios';
import { useState, createContext, useContext, useEffect } from 'react';
// import Cookies from 'js-cookie';

const server_transaction_url = 'http://localhost:3000/api/v1';
const server_user_url = 'http://localhost:3000/auth/user';

axios.defaults.withCredentials = true;

export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
    const [user, setUser] = useState([]);
    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);
    const [error, setError] = useState(null);
    const [tokenVal, setTokenVal] = useState(null);
    const [authMessage, setAuthMessage] = useState(null)
    const [authError, setAuthError] = useState(null);
    const [isAuth, setIsAuth] = useState(true);

    //signup user
    const signUp = async (user) => {
        // console.log("User Data Being Sent:", user); 
        try{
            const response = await axios.post(`${server_user_url}/signup`, user, {withCredentials: true});
            console.log("signup response:::",response.data);
            setAuthMessage(response.data.message);
            setAuthError(null);
            // setUser(user);
        } catch(error){
            console.log(error.response?.data?.message);
            setError(error.response?.data?.message);
            setAuthError(error.response?.data?.message);
        }
    }

    const signIn = async (user) => {
        try{
            const response = await axios.post(`${server_user_url}/signin`, user, {withCredentials: true});
            const userResponse = await axios.get(`${server_user_url}/getuser`, {withCredentials: true});
            console.log("signin response:::",response.data);
            console.log("user response:::",userResponse.data);
            if(!response) {
                console.log("Invalid credentials", error.response?.data?.message);
                return setError("Invalid credentials");
            }
    
            console.log("signin data from context:::",response.data.message);
            setAuthMessage(response.data.message);
            setUser(userResponse.data.user);
            setTokenVal(response.data.token);

            localStorage.setItem("user", JSON.stringify(userResponse.data.user));

        } catch(error){
            console.log("error in context:::",error.response?.data?.message);
            setError(error.response?.data?.message);
            setAuthError(error.response?.data?.message)
        }
    }

    const signout = async () => {  // No need to pass `user`
        try {
            const response = await axios.post(`${server_user_url}/signout`, {}, { withCredentials: true }); // Send an empty object
            console.log("logout:::", response.data);
            setAuthMessage(response.data.message);
            setUser([]);

            localStorage.removeItem("user");
        } catch (error) {
            console.log(error.response?.data?.message);
            setError(error.response?.data?.message || "Logout failed");
        }
    };
    

    const getIncome = async () => {
        try {
            setIsAuth(true)
            const response = await axios.get(`${server_transaction_url}/get-income`)
            console.log("getIncome response:::", response);

            if(!response || !response.data || response.data.length === 0){
                console.log("Failed to fetch incomes");
                return setError(err.response?.data?.error || "Failed to fetch incomes");
            }

            // if(response)

            // console.log("error response:::", error);
            setIncome(response.data);
            setError(null);
            console.log("response data:::",response.data);

        } catch (err) {
            setError(err.response?.data?.message || "Income Not Found!");
            setIsAuth(false)
            console.log("error response:::", err.response?.data?.message);
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
            setIsAuth(true)
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
            setIsAuth(false)
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
            signout,
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
            setAuthMessage,
            tokenVal,
            authError,
            setAuthError,
            isAuth,
            setIsAuth
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}