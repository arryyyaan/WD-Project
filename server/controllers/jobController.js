const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const Job = require("../models/jobSchema");
const User = require("../models/userSchema");
const Recruiter = require("../models/recruiterSchema");
const Employee = require("../models/employeeSchema");
const showJobListings = async (req, res) => {
  try {
    const allJobs = await Job.find({});
    res.status(200).json({ allJobs });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "f" });
  }
};

const nearByJobs = async (req, res) => {
  try {
    const emp = await Employee.findOne({ username: req.user.username });
    const lat = emp.location.coordinates[0];
    const lng = emp.location.coordinates[1];
    const jobs = await Job.find();
    const filteredJobs = jobs.filter((job) => {
      const distance = calculateDistance(lat, lng, job.lat, job.lng);
      return distance <= 1000;
    });
    const rec = await Recruiter.find({ _id: filteredJobs.recruiterId });
    console.log(rec);
    // Return the filtered users
    const employeeLocation = [lat, lng];
    const companyLocation = [filteredJobs.lat, filteredJobs.long];
    const returnData = {
      companyLocation: [
        [51.505, -0.09],
        [51.507, -0.12],
        [51.51, -0.1],
      ],
      companyName: ["Facebook", "Microsoft", "Google"],
      employeeLocation,
    };
    return res.json({ returnData });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "f" });
  }
};

function calculateDistance(lat1, lng1, lat2, lng2) {
  const earthRadius = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
}

const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    console.log(req.body);
    await Job.findByIdAndUpdate(jobId, {
      $addToSet: {
        users: {
          userId:req.user._id,
        },
      },
    });
    console.log(await Job.findById(jobId));
    res.status(200).json({ message: "Applied Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "f" });
  }
};
module.exports = { showJobListings, nearByJobs, applyJob };
