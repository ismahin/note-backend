import mongoose, {Schema} from "mongoose";
const userContent = new mongoose.Schema({
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
}, 
    { timestamps : true });

   
    

    
export const Content = mongoose.model("Content", userContent)