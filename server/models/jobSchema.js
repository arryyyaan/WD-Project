const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const geocoder = require("../utils/api");
const jobSchema=new mongoose.Schema({
    company:{
        type:String
    },
    timeOfPosting:{
        type:String
    },
    recruiterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Recruiter'
    },
    field:{
        type:String
    },
    jobTitle:{
        type:String
    },
    yearsOfExp:{
        type:Number
    },
    skills:{
        type:String
    },
    quizOrNot:{
        type:Boolean,
        default:false
    },
    workLocation:{
        type:String,
        enum:['remote','onsite']
    },
    users:[{
        userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'},
        _id:false
    }],
    salary:{
        type:Number
    },
    jobPincode:{
        type:Number
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
        },
        coordinates: {
            type: [Number],
            index: "2dsphere",
        },
        formattedAddress: String,
    }
},{timestamps:true})

jobSchema.pre("save", async function (next) {
    const loc = await geocoder.geocode(this.jobPincode);
    this.location = {
        type: "Point",
        coordinates: [loc[0].latitude, loc[0].longitude],
    };
    next();
});

const Job = mongoose.model('Job', jobSchema)
module.exports = Job