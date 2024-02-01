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
    isAnswer: {
        type: this.SwootSchema,
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