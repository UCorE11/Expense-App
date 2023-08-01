const transactionModel = require("../models/transactionModel")
const moment=require('moment')

const getAllTransaction = async (req, res) => {
    try {
        const {frequency,selectedDate,type}=req.body
        const transactions = await transactionModel.find({
            
            ...(frequency !== "custom" ? {
                date: { // this is responsible for the filtering of tasks as per date
                    $gt: moment().subtract(Number(frequency), "d").toDate(),  // this is for either 1 week,1 month, 1 year
                },
            }:{
                date:{  // this is for custom dates
                    $gte: selectedDate[0],
                    $lte: selectedDate[1]
                }
            }),
            userid: req.body.userid,
            ...(type!=="all" && {type}) // this is for select type
        })
        
        res.status(200).json(transactions)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const deleteTransaction=async(req,res)=>{
    try {
        await transactionModel.findOneAndDelete({_id:req.body.transactionId})
        res.status(200).send('Transaction Deleted')
    } catch (error) {
        console.log(500).json(error)
        res.status(500).json(error)
    }
}

const editTransaction=async(req,res)=>{
    try {
        await transactionModel.findOneAndUpdate({_id:req.body.transactionId},req.body.payload)
        res.status(200).send('Edit Success')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const addTransaction = async (req, res) => {
    try {
        const newTransaction = new transactionModel(req.body)  // input user data object is created with the schema transactionModel
        await newTransaction.save()                   // this new transaction object schema is saved to the mongoDB as it creates a new record in the table
        res.status(201).send('New expense added successfully')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = {
    getAllTransaction,
    addTransaction,
    editTransaction,
    deleteTransaction
}