const { UserModel } = require('../model/UserModel');
const { SwootModel } = require('../model/SwootModel');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function Decrypt(text) {
    var decrypted = CryptoJS.AES.decrypt(text, process.env.SECRET).toString(CryptoJS.enc.Utf8);
    return decrypted;
}

class SwootController {
    static async Swoot(req, res) {
        // var decrypted = Decrypt(req.body.jsonCrypt);
        // const json = JSON.parse(decrypted);
        const json = req.body;

        const { token, text, isAnswer } = json;
        const userid = jwt.decode(token).userid;

        const user = await UserModel.findOne({ _id: userid });

        const swoot = new SwootModel({
           user: user,
           text: text,
           isAnswer: isAnswer,
           createdAt: Date.now(),
           updatedAt: Date.now(),
           removedAt: null
        });

        try {
            await SwootModel.create(swoot);
            return res.status(200).send({ message: 'You swoot with success!'});
        } catch (error) {
            return res.status(500).send({ message: 'Something failed when trying to make the swoot', data: error.message});
        }
    }
}

module.exports = SwootController;