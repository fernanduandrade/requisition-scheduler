import mongoose from 'mongoose';

const appointment = new mongoose.Schema({
    name: String,
    phone: String,
    description: String,
    date: Date,
    examReleased: Boolean
});

exports default = appointment;