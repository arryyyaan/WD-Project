const express=require('express')
const router=new express.Router()
const authentication=require('../middlewares/auth')
const {sendMessage,allMessages}=require('../controllers/messageController')

router.post('/sendMessage',authentication,sendMessage)
router.post('/allMessages',authentication,allMessages)

module.exports=router