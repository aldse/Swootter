const mongoose = require('mongoose');
const { UserSchema } = require('./UserModel');

const SwootSchema = new mongoose.Schema({
    user: {
        type: UserSchema,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        required: true
    },
    isAnswer: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: false
    },
    removedAt: {
        type: Date,
        required: false
    },
});

const SwootModel = mongoose.model('Swoot', SwootSchema);
exports.SwootModel = SwootModel;
exports.SwootSchema = SwootSchema;