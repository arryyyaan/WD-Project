const express = require("express");
const router = new express.Router();
const authenticate=require('../middlewares/auth')

const {
    showJobListings,
    nearByJobs,
    applyJob
}=require('../controllers/jobController')
router.post('/showJobListings',authenticate,showJobListings)
router.post('/nearByJobs',authenticate,nearByJobs)
router.post('/applyJob',authenticate,applyJob)
module.exports=router