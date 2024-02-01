const mongoose = require('mongoose');
const { UserSchema } = require('./UserModel');
const { SwootSchema } = require('./SwootModel'); 

const LikesSchema = new mongoose.Schema({
    user: {
        type: UserSchema,
        required: true
    },
    swoot: {
        type: SwootSchema,
        required: true
    }
});

const LikesModel = mongoose.model('Likes', LikesSchema);
exports.LikesModel = LikesModel;
exports.LikesSchema = LikesSchema;