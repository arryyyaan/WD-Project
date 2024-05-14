const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const User = require("../models/userSchema");
const Feedback = require("../models/feedback");
const Employee = require("../models/employeeSchema");
const Recruiter = require("../models/recruiterSchema");
const Job = require("../models/jobSchema");
const nodemailer = require("nodemailer");
const sendEmail = require("../utils/functions");

const addJobPosting=async(req,res)=>{
    try {
        const {field,jobTitle,yearsOfExp,skills,quizOrNot,workLocation,salary}=req.body
        const job=new Job({field,jobTitle,yearsOfExp,skills,quizOrNot,workLocation,salary})
        const user=await Recruiter.findOne({username:req.user.username})
        job.company=user.companyName
        job.recruiterId=user._id
        console.log(user._id,job.recruiterId)
        let date=new Date()
        let time=date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()
        job.timeOfPosting=time
        job.jobPincode=user.recPincode

        await job.save()
        res.status(200).json({message:'Job Added'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error })
    }
}

const showUsersInterested=async(req,res)=>{
    try {
        const r=await User.findById(req.user._id)
/*         console.log(r) */
        const rec=await Recruiter.findOne({username:r.username})
/*         console.log(rec) */
        const jobs=await Job.find({recruiterId:rec._id})
        console.log(jobs)
        res.status(200).json({jobs})
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error })
    }
}

const userForJob=async(req,res)=>{
    try {
        const {jobId}=req.body
        const job=await Job.findById(jobId)
        const userIds = job.users;
        const users = await User.find({ _id: { $in: userIds } });
        res.status(200).json(users);
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error })
    }
}

const filterUsers=async(req,res)=>{
    try {
        const {field,criteria}=req.body
        if(field==='yearsOfExp')
        {
            const users=await Employee.find({yearsOfExp:{$gt:criteria}})
            res.status(200).json({users})
        }else{
            const keyword=criteria?{
                $or:[
                {skills:{$regex:criteria}},
                {description:{$regex:criteria}},
                {field:{$regex:criteria}}
                ]
            }:{}
            const users=await Employee.find(keyword)
            res.status(200).json({users})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error })
    }
}

const recruiterDetails=async(req,res)=>{
    try {
        const rec=await Recruiter.findById(req.params.id)
        const user=await User.findOne({username:rec.username})
        res.status(200).json({rec,user})
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error })
    }
}

module.exports={addJobPosting,showUsersInterested,filterUsers,recruiterDetails,userForJob}