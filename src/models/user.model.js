import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    pets: [{
        type: Schema.Types.ObjectId,
        ref: 'pets',
        default: []
    }]
})

const userModel = model('users', userSchema)
export default userModel