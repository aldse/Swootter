const mongoose = require('mongoose');
const { UserSchema } = require('./UserModel');
const { SwootSchema } = require('./SwootModel'); 

const RespostasSchema = new mongoose.Schema({
    user: {
        type: UserSchema,
        required: true
    },
    swoot: {
        type: SwootSchema,
        required: true
    }
});

const RespostasModel = mongoose.model('Respostas', RespostasSchema);
exports.RespostasModel = RespostasModel;
exports.RespostasSchema = RespostasSchema;