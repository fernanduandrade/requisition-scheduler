import mongoose from 'mongoose';

const requisition = new mongoose.Schema({
    name: String,
    phone: String,
    description: String,
    date: Date,
    examReleased: Boolean
});

export default = requisition;