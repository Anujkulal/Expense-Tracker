const { Schema, model } = require('mongoose');

const ExpenseSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
        maxLength: 50
    },
    type: {
        type: String,
        default: "expense",
    },
    date: {
        type: Date,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        // required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
}, { timestamps: true });

const Expense = model('Expense', ExpenseSchema);

module.exports = Expense;