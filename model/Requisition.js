import mongoose from 'mongoose';

const requisition = new mongoose.Schema({
    name: String,
    phone: String,
    date: String,
    location: String,
    exam: String,
    examFinished: Boolean
});

export default requisition;