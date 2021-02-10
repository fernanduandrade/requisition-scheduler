import mongoose, { Schema } from 'mongoose';

const adminSchema = new Schema({
    name: {
        type: String,
        requied: true
    },
    email: {
        type: String,
        required: true,
        set: email => email.toLowerCase()
    },
    password: {
        type:String,
        required: true
    },
}, {timestamps: true});

export const Admin = mongoose.model('Admin', adminSchema);