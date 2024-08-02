import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    bio: {
        type: String,
        required: true,
    },
});

const Userdb = mongoose.model('Userdb', userSchema);

export default Userdb;
