const mongoose = require('mongoose');
const { Accounts } = require("../db");
const authMiddleware = require("../middleware");

const express = require('express');
const accountRouter = express.Router();

accountRouter.get("/balance",authMiddleware, async function(req,res){
    const metaData = await Accounts.findOne({userId: req.userId});
    if(!metaData){
        return res.status(404).json({});
    }
    res.status(200).json({
        balance: metaData.balance
    });
})
accountRouter.post("/transfer",authMiddleware,async (req,res)=>{
    const {amt,to} = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();
    const account = await Accounts.findOne({userId: req.userId}).session(session);
    if(!account || account.balance<amt){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance!"
        });
    }

    const reciever = await Accounts.findOne({userId: to}).session(session);
    if(!reciever){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Reciever Not Found!"
        });
    }

    //Initiating Transaction
    await Accounts.updateOne({userId: req.userId},{$inc: {balance: -amt}}).session(session);
    await Accounts.updateOne({userId: to},{$inc: {balance: +amt}}).session(session);
    //transaction done
    //commiting the transaction
    await session.commitTransaction();
    return res.status(200).json({
        message: "Transaction Successful!"
    })

})

module.exports = accountRouter;