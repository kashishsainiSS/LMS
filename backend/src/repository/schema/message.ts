import mongoose,{Document, Schema} from "mongoose";

export interface IMessage extends Document{
    senderId:string;
    receiverId:string;
    subject:string;
    content:string;
    timeStamp:string;
    createdAt:string;
}

const MessageSchema:Schema = new mongoose.Schema({
    senderId:{
        type:String
    },
    recevierId:{
        type:String
    },
    subject:{
        type:String
    },
    content:{
        type:String
    },
    timeStamp:{
        type:String
    }
})

export default mongoose.model<IMessage>('message',MessageSchema);