import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    user : {
        type: mongoose.Types.ObjectId,
        required : true
    },
    date : {
        type: Date,
        required: true
    },
    category : {
        type: String,
        required: true,
        trim : true,
        minLength: 1
    },
    description : {
        type: String,
        trim : true,
        minLength: 1,
        maxLength: 500
    },
    amount : {
        type: Number,
        required: true,
        validator: {
            validate: (v : number) => v > 0
        }
    }
})

const Expense = mongoose.model("")