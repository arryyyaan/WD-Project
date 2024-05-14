const mongoose=require('mongoose')

const chatSchema=mongoose.Schema(
    {
        isGrpChat:{type:Boolean,default:false},
        users:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }],
        latestMsg:{type:mongoose.Schema.Types.ObjectId,
        ref:'Message'}
    },{timestamps:true}
)
const Chat=mongoose.model('Chat',chatSchema)
module.exports=Chat