import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // id: { type: Number, required: true },
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        index: true
    },
    password: { type: String, required: true },
    mode: { type: String, enum: ['seller', 'customer'], required: true }
});

const userModel = mongoose.model('User', userSchema);
export default userModel;