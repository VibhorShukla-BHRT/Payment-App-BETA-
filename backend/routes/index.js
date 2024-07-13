// this is "/api/v1"
const express = require('express');
const userRouter = require('./user');
const accountRouter = require('./accounts');
const router = express.Router();

router.use("/account",accountRouter);
router.use("/user",userRouter);
module.exports =router;