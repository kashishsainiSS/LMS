import mongoose, {Schema, Document} from 'mongoose';

export interface IAccount extends Document{
    name:string;
    username:string;
    password:string;
    role:string;
}

const AccountSchema :Schema = new mongoose.Schema({
    name:{
        type:String,
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String
    }
})

export default  mongoose.model<IAccount>("Account",AccountSchema);