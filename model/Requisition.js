import mongoose from 'mongoose';

const { Schema }  = mongoose;


const requisitionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    exam: {
        type: String,
        required: false
    },
    examFinished: {
        type: Boolean,
        required: false
    },
    password: String,
    email: String
}, {timestamps: true});

export const Requisition = mongoose.model('Requisition', requisitionSchema);