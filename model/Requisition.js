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
    email: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    finishedSession: {
        type: Boolean,
        required: false
    },
    notified: {
        type: Boolean,
        required: false
    }
}, {timestamps: true});

export const Requisition = mongoose.model('Requisition', requisitionSchema);