const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const User=require('../models/userSchema')
const Chat=require('../models/chatSchema')

const accessChat=async(req,res)=>{
    const {userId}=req.body
    var isChat=await Chat.find({
        isGrpChat:false,
        $and:[
            {$users:{$elemmatch:{$eq:req.user._id}}},
            {$users:{$elemmatch:{$eq:userId}}}
        ]
    }).populate("users","-password").populate("latestMsg")
    isChat=await User.populate(isChat,{
        path:'latestMsg.sender',
        select:'name email'
    })
    if(isChat.length>0)
    res.status(200).json(isChat[0])
    else
    {
        var chatData={
            chatName:'sender',
            isGrpChat:false,
            users:[req.user._id,userId]
        }    
    
    try {
        const chat=await Chat.create(chatData)
        const fullChat=await Chat.findById(chat._id).populate("users","-password")
        res.status(200).json({fullChat})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    }
}

const fetchChats=async(req,res)=>{
    try {
        await Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
        .populate('users','-password')
        .populate('latestMsg')
        .sort({updatedAt:-1})
        .then(async(results)=>{
            results=await User.populate(results,{
                path:'latestMsg.sender',
                select:'name email'
            })
            res.status(200).json({results})
    })
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

module.exports={accessChat,fetchChats}