const express = require('express');
const zod = require('zod');
const { User, Accounts } = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');
const authMiddleware = require('../middleware');
const userRouter = express.Router();

const schema = zod.object({
    username:zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string().min(6)
})
const signinSchema = zod.object({
    username: zod.string(),
    password: zod.string().min(6)
})
const updateSchema = zod.object({
    password: zod.string().min(6).optional(),
    firstName:zod.string().optional(),
	lastName: zod.string().optional()
})
//sign-up
userRouter.post("/signup",async (req,res)=>{
    const body = req.body;
    const { success } = schema.safeParse(body);
    if(!success){
        return res.status(411).json({
            message: "Invalid Inputs!"
        });
    }
    if(await User.findOne({username: body.username})){
        return res.status(411).json({
            message: "User Already Exists. Sign-in instead!"
        })
    }

    const saveUser = await User.create({
        username: body.username,
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName,
    })
    const id = saveUser._id;
    const jwttoken = jwt.sign({id},JWT_SECRET);
    const ran = 1+Math.random()*10000;
    await Accounts.create({
        userId: id,
        balance: ran.toFixed(2)
    })
    res.status(200).json({
        message: "User created successfully",
        token: jwttoken
    });
});
//sign-in
userRouter.post("/signin",async (req,res)=>{
    const body = req.body;
    const { success } = signinSchema.safeParse(body);
    if(!success) return res.status(411).json({
        message: "Invalid Inputs!"
    });
    const user = await User.findOne({username: body.username,password: body.password});
    if(!user) return res.status(411).json({
        message: "No user with such user exists. Try signing up!"
    });
    const id = user._id;
    const jwttoken = jwt.sign({id},JWT_SECRET);
    res.status(200).json({
        message: "Logged-in",
        token: jwttoken
    })
});

userRouter.put("/",authMiddleware,async(req,res)=>{
    const {success} = updateSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        });
    }
    await User.updateOne({_id: req.userId},req.body);
    return res.status(200).json({
        message: "Updated successfully"
    })
})
userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
module.exports =userRouter;