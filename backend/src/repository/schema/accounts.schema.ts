require('dotenv').config();
import jwt  from 'jsonwebtoken';
import mongoose, {Schema, Document} from 'mongoose';
import bcrypt from 'bcryptjs';
export interface IAccount extends Document{
    name:string;
    email:string;
    password:string;
    avatar:{
        public_id:string;
        url:string
    };
    isVerified:boolean;
    courses:Array<{CourseId:string}>;
    role:string;
    comparePassword:(password:string)=>Promise<boolean>;
    SignAccessToken:()=>string;
    SignRefreshToken:()=>string;
}

const AccountSchema :Schema = new mongoose.Schema({
    name:{
        type:String,
        lowercase:true,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
       public_id:String,
       url:String
    },
    isVerified:{
        type:Boolean,
        default:false,
        // required:true/
    },
    courses:[
        {
            courseId:String
        }
    ],
    role:{
        type:String,
        default:"user",
        required:true
    },
    
},
{timestamps:true}
)

// Hash Password before saving
AccountSchema.pre<IAccount>("save",async function(next){
    if(!this.isModified("password")){
         next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

// sign access Token
AccountSchema.methods.SignAccessToken = function(){
    return jwt.sign({id:this._id}, process.env.ACCESS_TOKEN || "" );
}

// sign refresh Token
AccountSchema.methods.SignRefreshToken = function(){
    return jwt.sign({id:this._id}, process.env.REFRESH_TOKEN || "");
}

// compare Password
AccountSchema.methods.comparePassword= async function(
    enteredPassword:string
):Promise<boolean>{
    return await bcrypt.compare(this.password, enteredPassword);
}

export default  mongoose.model<IAccount>("Account",AccountSchema);