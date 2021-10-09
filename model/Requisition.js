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
        type: Date,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    examFinished: {
        type: Boolean,
        required: false
    },
    finishedSession: {
        type: Boolean,
        required: false
    }
}, {timestamps: true});

export const Requisition = mongoose.model('Requisition', requisitionSchema);