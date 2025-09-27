import { model } from "mongoose"

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BetSchema = new Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    }],
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        default: null
    },
    description: {
        type: String,
        trim: true
    },
    coolDown: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

const modelName = 'Bet'
export default model(modelName, BetSchema)
