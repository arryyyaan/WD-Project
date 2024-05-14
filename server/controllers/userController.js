const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const fs=require('fs')
const pdfparse=require('pdf-parse')        
app.use(express.json());
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
app.use(fileUpload());
const User = require("../models/userSchema");
const Feedback = require("../models/feedback");
const Employee = require("../models/employeeSchema");
const Recruiter = require("../models/recruiterSchema");
const nodemailer = require("nodemailer");
const { sendEmail } = require("../utils/functions");
const getAuth = async (req, res) => {
  try {
    console.log("sss");
    res.send(req.user);
  } catch (err) {
    console.log(err);
  }
};

const newUser = async (req, res) => {
  try {
    let resumeText;
    console.log(req.body);
    const {
      username,
      password,
      email,
      country,
      socials,
      phoneNumber,
      role,
      firstName,
      lastName,
      profilePic,
      phoneNumberPrefix,
      resume,
      skills,
      yearsOfExp,
      description,
      highestEducation,
      field,
      city,
      pincode,
      laidOff,
      laidOffDoc,
      companyName,
      basedOutOff,
    } = req.body;
    var name = firstName + " " + lastName;
    var phone = phoneNumberPrefix + " " + phoneNumber;
    console.log(role);


    const userExist = await User.findOne({ username: username });
    const emailExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "Username is not unique" });
    }
    if (emailExist) {
      return res.status(400).json({ message: "Email is not unique" });
    }

    const user = new User({
      username,
      password,
      email,
      country,
      role,
      socials,
      phoneNumber: phone,
      name,
      profilePic,
    });
    await user.save();
    const recPincode = pincode;

    if (role === "Employee") {
        const pdffile=fs.readFileSync('uploads/aman_resume.pdf')
        pdfparse(pdffile).then(function(data){
            console.log(data.text)
        })
      const employee = new Employee({
        resume,
        skills,
        yearsOfExp,
        description,
        highestEducation,
        field,
        city,
        pincode,
        laidOff,
        laidOffDoc,
      });
      employee.username = username;
      await employee.save();
    } else if (role === "Recruiter") {
      const recruiter = new Recruiter({ companyName, basedOutOff, recPincode });
      recruiter.username = username;
      await recruiter.save();
    }
    await sendEmail({
      emailId: email,
      subject: "Signed up",
      message: "Verification mail for your account on JobSearch",
    });
    res.status(200).json({ message: "Successfully Registered" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userToBeChecked = await User.findOne({ email: email });
    if (userToBeChecked) {
      const passwordMatchOrNot = await bcrypt.compare(password, userToBeChecked.password);
      if (passwordMatchOrNot) {
        const token = await userToBeChecked.generateAuthToken();
        res.cookie("jsonwebtoken", token, {
          maxAge: 86400000,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        return res.status(200).json({ message: "Login successful" });
      } else {
        return res.status(400).json({ message: "password did not match" });
      }
    } else {
      const emailToBeChecked = await User.findOne({ username: email });
      if (emailToBeChecked) {
        const passwordMatchOrNot = await bcrypt.compare(password, emailToBeChecked.password);
        if (passwordMatchOrNot) {
          const token = await emailToBeChecked.generateAuthToken();
          res.cookie("jsonwebtoken", token, {
            maxAge: 86400000,
            httpOnly: true,
            sameSite: "none",
            secure: true,
          });

          await sendEmail({
            emailId: emailToBeChecked.email,
            subject: "Logged In",
            message: "Verification mail for login on JobSearch",
          });
          return res.status(200).json({ message: "Login successful" });
        } else {
          return res.status(400).json({ message: "password did not match" });
        }
      } else {
        return res.status(400).json({ message: "no user exists" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(234).json({ message: "f" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("jsonwebtoken", { path: "/" });
  res.status(200).json({ message: "User logged out successfully" });
};

const feedback = async (req, res) => {
  try {
    const { subject, message } = req.body;
    const fdbk = {
      subject: subject,
      message: message,
      user: req.user._id,
    };
    var feedbk = await Feedback.create(fdbk);
    feedbk = await feedbk.populate("user", "-password");
    res.status(200).json({ message: feedbk });
  } catch (error) {
    console.log(error);
  }
};

const forgotPass = async (req, res) => {
  const { email } = req.body;
  try {
    const userData = await User.findOne({ email: email });
    if (!userData) return res.status(400).json({ message: "no user found" });
    const otp = Math.floor(Math.random() * 10000);
    await User.findByIdAndUpdate(userData._id, {
      otp: otp,
      otpExpire: new Date().getTime() + 300 * 1000,
    });
    await sendEmail({
      emailId: email,
      subject: "OTP for your account for <LOGO>",
      message: `OTP to reset password is ${otp}, Please ignore this message if you did not otp for this`,
    });
    res.status(200).json({ message: "OTP sent on registered email" });
  } catch (error) {
    console.log(error);
  }
};

const verifyOtp = async (req, res) => {
  try {
    console.log(req.body);
    const { otp, email } = req.body;
    let currentTime = new Date().getTime();
    const userData = await User.findOne({ email: email });
    console.log(userData);
    let diff = userData.otpExpire - currentTime;
    if (diff < 0) return res.status(400).json({ message: "Time limit exceeded" });
    if (!otp) res.status(400).json({ error: "pls enter otp!!!" });
    else if (otp == userData.otp) {
      userData.password = "";
      return res.status(200).json({ message: "otp verified" });
    } else {
      return res.status(400).json({ message: "invalid otp" });
    }
  } catch (err) {
    console.log(err);
  }
};

const newPass = async (req, res) => {
  try {
    const { password, email } = req.body;
    const userData = await User.findOne({ email: email });
    if (!password) return res.status(400).json({ message: "pls enter details" });
    userData.password = password;
    await userData.save();
    res.status(200).json({ message: "password updated" });
  } catch (err) {
    console.log(err);
  }
};

const newProfilePic = async (req, res) => {
  try {
    const { newPfp } = req.body;
    if (!newPfp) return res.status(400).json({ message: "Enter a profile pic" });
    await User.findByIdAndUpdate(req.user._id, { profilePic: newPfp });
    res.status(200).json({ message: "Profile pic updated" });
  } catch (error) {
    console.log(error);
  }
};

const updatePass = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    if (!password) return res.status(400).json({ message: "Enter previous password" });
    const passwordMatch = await bcrypt.compare(password, req.user.password);
    if (!passwordMatch) return res.status(400).json({ message: "Invalid previous password" });
    const user = req.user;
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password Updated" });
  } catch (error) {
    console.log(error);
  }
};

const searchedUser=async(req,res)=>{
    try {
        const keyword=req.query.search?{
            $or:[
                {name:{$regex:req.query.search}},
                {email:{$regex:req.query.search}}
            ]
        }:{}
        const users=await User.find(keyword).find({_id:{$ne:req.user._id}})
        res.status(200).json({users})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
const particularUser=async(req,res)=>{
  try {
    const {userId}=req.body
    const user=await User.findById(userId)
    res.status(200).json({user})
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
module.exports = {
  newUser,
  loginUser,
  logout,
  feedback,
  forgotPass,
  verifyOtp,
  newPass,
  getAuth,
  newProfilePic,
  updatePass,
  searchedUser,
  particularUser
};