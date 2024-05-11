import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: string,
        required: true,
        lowercase: true,
        unique: true,
    },
    email: {
        type: string,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: string,
        required: true,
    },
}, { timestamps: true }
);

export const User = mongoose.model('User', userSchema);