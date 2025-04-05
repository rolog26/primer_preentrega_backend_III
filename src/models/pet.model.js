import { Schema, model } from "mongoose";

const petSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['cat', 'dog'],
        required: true,
    }
})

const petModel = model('pets', petSchema)
export default petModel