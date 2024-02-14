const { UserModel } = require("../model/UserModel");
const { SwootModel } = require("../model/SwootModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const jwt_decode = require('jwt-decode');
require("dotenv").config();

function Decrypt(text) {
  var decrypted = CryptoJS.AES.decrypt(text, process.env.SECRET).toString(
    CryptoJS.enc.Utf8
  );
  return decrypted;
}

class SwootController {
  static async Swoot(req, res) {
    const { token, text, isAnswer } = req.body;

    const decode = jwt_decode.jwtDecode(token);
    const user = await UserModel.findOne({ _id: decode.userid });

    const swoot = new SwootModel({
      user: user,
      text: text,
      isAnswer: isAnswer,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      removedAt: null,
    });

    try {
      await SwootModel.create(swoot);
      return res.status(200).send({ message: "Swoot adicionado com sucesso" });
    } catch (error) {
      return res.status(500).send({
        message: "Something failed when trying to make the swoot",
        data: error.message,
      });
    }
  }

  static async GetAllSwoots(req, res) {
    try {
      const swoots = await SwootModel.find();
      res.status(200).send({ swoots: swoots });
    } catch (error) {
      return res.status(500).send({
        message: "Something failed when trying to get all posts",
        data: error.message,
      });
    }
  }

  // static async GetById(req, res) {
  //   const {_id} = req.params
  //   try {
  //     const swoots = await SwootModel.findById(_id);
  //     console.log
  //     res.status(200).send({ swoots: swoots });
  //   } catch (error) {
  //     return res.status(500).send({
  //       message: "Something failed when trying to get post",
  //       data: error.message,
  //     });
  //   }
  // }

  static async Delete(req, res) {
      var decrypted = Decrypt(req.body.jsonCrypt);
      const json = JSON.parse(decrypted);
      const { swootid } = json;

      try {
          await SwootModel.deleteOne({ _id: swootid });
          res.status(200).send({ message: 'Swoot deletado com sucesso' });
      } catch (error) {
          return res.status(500).send({ message: 'Something failed when trying to delete the swoot', data: error.message});
      }
  }
}

module.exports = SwootController;
