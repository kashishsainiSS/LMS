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
        lowercase:true,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
})

export default  mongoose.model<IAccount>("Account",AccountSchema);