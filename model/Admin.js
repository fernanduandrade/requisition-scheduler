import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema }  = mongoose;

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
        type: String,
        required: true
    },
}, {timestamps: true});

adminSchema.pre("save", async function(next) {
    this.password = await bcrypt.hashSync(this.password, 10);
    next();
})


export const Admin = mongoose.model('Admin', adminSchema);
