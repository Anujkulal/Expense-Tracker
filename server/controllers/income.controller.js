const Income = require("../models/income.model");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date} = req.body;
    const income = Income({
        title,
        amount,
        category,
        description,
        date,
        createdBy: req.user.id,
    })
    
    try{
        if(!title || !amount || !category || !date){
            return res.status(400).json({error: "All fields are required"})
        }
        if(amount < 0 || !amount === Number){
            return res.status(400).json({error: "Amount must be a positive number"})
        }
        await income.save();
        res.status(200).json({message: "Income added successfully"})
    } catch(err){
        res.status(500).json({error: "Internal server error"})
    }
    // console.log(income)
}

exports.getIncome = async (req, res) => {
    try{ 
        if(!req.user || !req.user.id){
            console.log("Unauthorized access")
           return res.status(400).json({message: "Unauthorized access"});
        } 
        const incomes = await Income.find({ createdBy: req.user.id }).sort({createdAt: -1});
        console.log("on getincome:::",req.user)
        if(!incomes || incomes.length === 0){
            return res.status(404).json({error: "No income found"})
        }
        res.status(200).json(incomes)
    }catch(err){
        res.status(500).json({error: "Internal server error"})
    }
}

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    await Income.findByIdAndDelete(id)
    .then((income) => {
        if(!income){
            return res.status(404).json({error: "Income not found"})
        }
        res.status(200).json({message: "Income deleted successfully", income})
    })
    .catch((err) => {
        res.status(500).json({error: "Internal server error"})
    })
}