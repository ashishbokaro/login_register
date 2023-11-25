import mongoose, { Document, Schema } from "mongoose";

import User from "../interfaces/user.interface";
import ShortUniqueId from "short-unique-id";
import CryptoJS  from "crypto-js";
import {CommonErrorMessage, basicConfigurationObject} from "../utils/constants";
const uid = new ShortUniqueId();

interface UserDocument extends User, Document {}

const userSchema = new Schema<UserDocument>({
    accountBlocked:{
        required:true,
        type:Boolean
    },
    coverImage:{
        required:false,
        type:String
    },
    email: {
        index:true,
        lowercase: true,
        required: [true, CommonErrorMessage.EMAIL_REQUIRED],
        trim: true,
        type: String,
        unique: true,
        validate: {
            message: CommonErrorMessage.INVALID_EMAIL,
            validator: (value: string) => {
                // Email validation regex
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                return emailRegex.test(value);
            },
        },
    },
    emailVerified:{
        required:false,
        type:Boolean
    },
    emailVerifiedTime:{
        required:false,
        type:Date
    },
    firstName:{
        required:false,
        type:String
    },
    lastName:{
        required:false,
        type:String
    },
    loginCount:{
        required:false,
        type:Number
    },
    password:{
        required:[true, CommonErrorMessage.PASSWORD_REQUIRED],
        type:String
    },
    refreshToken:{
        required:false,
        type:String,
    },
    salt:{
        required:false,
        type:String
    },
    userName:{
        lowercase:true,
        required:[false, CommonErrorMessage.USERNAME_REQUIRED],
        trim:true,
        type:String,
        // unique:true,
        validate:{
            message:CommonErrorMessage.USERNAME_VALIDATION_ERROR,
            validator:(value:string)=>{
                const userNameRegex = /^[a-zA-Z0-9]+$/;

                return  userNameRegex.test(value);
            }
        }
    },
    userRole:{
        required:true,
        trim:true,
        type:Number
    }
},
{
    timestamps: true
});

async function passworEncryption(password:string, salt:string):Promise<string>{
    const loginKey = basicConfigurationObject.PASSWORD_SECRET_KEY;

    if(!loginKey) return CommonErrorMessage.LOGIN_KEY_MISSING;
    const passwordHashed = await CryptoJS.HmacSHA256(password + salt, loginKey).toString();

    return passwordHashed;
}

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    
    this.salt = uid.stamp(32);

    this.password = await passworEncryption(this.password, this.salt);
    
});

const UserModel =  mongoose.model<User>("user", userSchema);

export default UserModel;