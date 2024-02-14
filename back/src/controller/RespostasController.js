const { UserModel } = require('../model/UserModel');
const { SwootModel } = require('../model/SwootModel');
const { RespostasModel } = require('../model/RespostasModel');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function Decrypt(text) {
    var decrypted = CryptoJS.AES.decrypt(text, process.env.SECRET).toString(CryptoJS.enc.Utf8);
    return decrypted;
}

class RespostasController {
    static async Resposta(req, res) {
        const { token, swootid } = req.body;
        const userid = jwt.decode(token).userid;

        const user = await UserModel.findOne({ _id: userid });
        const swoot = await SwootModel.findOne({ _id: swootid });

        const searchResposta = await RespostasModel.findOne({ user: user, swoot: swoot});
        if (searchResposta)
        {
            try {
                await RespostasModel.deleteOne({ user: user, swoot: swoot});
                return res.status(200).send({ message: 'You removed your Resposta :('});
            } catch (error) {
                return res.status(500).send({ message: 'Something failed when trying to remove your Resposta from the swoot', data: error.message});
            }
        }

        const Resposta = new RespostasModel({
            user: user,
            swoot: swoot
        });
 
        try {
            await RespostasModel.create(Resposta);
            return res.status(200).send({ message: 'You Respostad!'});
        } catch (error) {
            return res.status(500).send({ message: 'Something failed when trying Resposta the swoot', data: error.message});
        }
    }

    static async GetAllRespostas(req, res) {
        const swootid = req.params.id;
        try {
            const swoot = await SwootModel.findOne({ _id: swootid});
            const Respostas = await RespostasModel.find({ swoot: swoot });
            console.log(Respostas);
            return res.status(200).send({ Respostas: Respostas });
          } catch (error) {
            return res.status(500).send({
              message: "Something failed when trying to get all Respostas from this swoot",
              data: error.message,
            });
          }
    }
}

module.exports = RespostasController;