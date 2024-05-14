const express = require("express");
const router = new express.Router();
const authenticate=require('../middlewares/auth')

const {
    addJobPosting,
    showUsersInterested,
    filterUsers,
    recruiterDetails,
    userForJob
}=require('../controllers/recruiterController')
router.post('/addJobPosting',authenticate,addJobPosting)
router.post('/showUsersInterested',authenticate,showUsersInterested)
router.post('/filterUsers',authenticate,filterUsers)
router.get('/:id',authenticate,recruiterDetails)
router.post('/userForJob',authenticate,userForJob)
module.exports=router