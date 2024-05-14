const express=require('express')
const router = new express.Router();
const {accessChat,fetchChats}=require('../controllers/chatController')
const authentication=require('../middlewares/auth')
router.post('/accessChat',authentication,accessChat)
router.get('/fetchChats',authentication,fetchChats)

module.exports=router