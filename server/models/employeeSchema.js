const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const geocoder=require('../utils/api')
const employeeSchema=new mongoose.Schema({
    username:{type:String},
    resume:{
        type:String
    },
    skills:{
        type:String
    },
    yearsOfExp:{
        type:Number
    },
    description:{
        type:String
    },
    highestEducation:{
        type:String
    },
    field:{
        type:String
    },
    city:{
        type:String
    },
    pincode:{
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
    },
    resumeText:{
        type:String
    },
    laidOff:{
        type:String,
        enum:['NA','Pending','Accept','Reject']
    },
    laidOffDoc:{
        type:String
    }
},{ timestamps: true })

employeeSchema.pre("save", async function (next) {
    const loc = await geocoder.geocode(this.pincode);
    this.location = {
        type: "Point",
        coordinates: [loc[0].latitude, loc[0].longitude],
    };
    next();
});

const Employee = mongoose.model('Employee', employeeSchema)
module.exports = Employee