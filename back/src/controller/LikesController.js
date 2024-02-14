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
        const { token, swootid } = req.body;
        const userid = jwt.decode(token).userid;

        const user = await UserModel.findOne({ _id: userid });
        const swoot = await SwootModel.findOne({ _id: swootid });
        
        var searchIndex = swoot.likes.findIndex(user => user._id == userid);
        if (searchIndex != -1)
        {
            try {
                await SwootModel.updateOne({ _id: swootid }, { $pull: { likes: user }})
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
            await SwootModel.updateOne({ _id: swootid }, { $push: { likes: user }})
            await LikesModel.create(like);
            return res.status(200).send({ message: 'You liked!'});
        } catch (error) {
            return res.status(500).send({ message: 'Something failed when trying like the swoot', data: error.message});
        }
    }

    static async GetAllLikes(req, res) {
        const swootid = req.params.id;
        try {
            const swoot = await SwootModel.findOne({ _id: swootid});
            const likes = await LikesModel.find({ swoot: swoot });
            return res.status(200).send({ likes: likes });
          } catch (error) {
            return res.status(500).send({
              message: "Something failed when trying to get all likes from this swoot",
              data: error.message,
            });
          }
    }
}

module.exports = LikesController;