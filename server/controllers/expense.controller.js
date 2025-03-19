const Expense = require("../models/expense.model");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date} = req.body;
    const expense = Expense({
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
        await expense.save();
        res.status(200).json({message: "Expense added successfully"})
    } catch(err){
        res.status(500).json({error: "Internal server error"})
    }
    // console.log(expense)
}

exports.getExpense = async (req, res) => {
    try{ 
        const expense = await Expense.find({ createdBy: req.user.id }).sort({createdAt: -1});
        // console.log(expense.length)
        if(!expense || expense.length === 0){
            return res.status(404).json({error: "No Expense found"})
        }
        res.status(200).json(expense)
    }catch(err){
        res.status(500).json({error: "Internal server error"})
    }
}

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    await Expense.findByIdAndDelete(id)
    .then((expense) => {
        if(!expense){
            return res.status(404).json({error: "Expense not found"})
        }
        res.status(200).json({message: "Expense deleted successfully", expense});
    })
    .catch((err) => {
        res.status(500).json({error: "Internal server error"})
    })
}