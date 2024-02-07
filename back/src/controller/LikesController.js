const { UserModel } = require('../model/UserModel');
const { SwootModel } = require('../model/SwootModel');
const { LikesModel } = require('../model/LikesModel');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function Decrypt(text) {
    var decrypted = CryptoJS.AES.decrypt(text, process.env.SECRET).toString(CryptoJS.enc.Utf8);
    return decrypted;
}

class LikesController {
    static async Like(req, res) {
        var decrypted = Decrypt(req.body.jsonCrypt);
        const json = JSON.parse(decrypted);
        // const json = req.body;

        const { token, swootid } = json;
        const userid = jwt.decode(token).userid;

        const user = await UserModel.findOne({ _id: userid });
        const swoot = await SwootModel.findOne({ _id: swootid });

        const searchLike = await LikesModel.findOne({ user: user, swoot: swoot});
        if (searchLike)
        {
            try {
                await LikesModel.deleteOne({ user: user, swoot: swoot});
                return res.status(200).send({ message: 'You removed your like :('});
            } catch (error) {
                return res.status(500).send({ message: 'Something failed when trying to remove your like from the swoot', data: error.message});
            }
        }

        const like = new LikesModel({
            user: user,
            swoot: swoot
        });
 
        try {
            await LikesModel.create(like);
            return res.status(200).send({ message: 'You liked!'});
        } catch (error) {
            return res.status(500).send({ message: 'Something failed when trying like the swoot', data: error.message});
        }
    }
}

module.exports = LikesController;