const { UserModel } = require("../model/UserModel");
const { SwootModel } = require("../model/SwootModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function Decrypt(text) {
  var decrypted = CryptoJS.AES.decrypt(text, process.env.SECRET).toString(
    CryptoJS.enc.Utf8
  );
  return decrypted;
}

class SwootController {
  static async Swoot(req, res) {
    var decrypted = Decrypt(req.body.jsonCrypt);
    const json = JSON.parse(decrypted);
    // const json = req.body;

    const { token, text, isAnswer } = json;
    const userid = jwt.decode(token).userid;

    const user = await UserModel.findOne({ _id: userid });

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
      return res.status(200).send({ message: "You swoot with success!" });
    } catch (error) {
      return res.status(500).send({
        message: "Something failed when trying to make the swoot",
        data: error.message,
      });
    }
  }

  static async GetSwoot(req, res) {
    var decrypted = Decrypt(req.body.jsonCrypt);
    const json = JSON.parse(decrypted);
    // const json = req.body;

    const { user, text } = json;

    const findByIdUser = await UserModel.findOne([{ user }]);

    var response;
    Object.entries(json).forEach((entry) => {
      if (!entry[1] || entry[1] == "") {
        response = `${entry[0]} is mandatory!`;
        return;
      }
    });
    if (response) return res.status(400).json({ message: response });

    if (!findByIdUser) return res.status(422).json({ message: "Invalid user" });

    var decrypted = Decrypt(findByIdUser.text);
    if (decrypted != text)
      return res.status(422).json({ message: "Invalid text!" });

    try {
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          userid: findByIdUser._id,
        },
        secret,
        {
          expiresIn: "1 day",
        }
      );
      res.status(200).send({ token: token });
    } catch (error) {
      return res.status(500).send({
        message: "Something failed when trying to post the swoot",
        data: error.message,
      });
    }
  }

  static async Delete(req, res) {
      var decrypted = Decrypt(req.body.jsonCrypt);
      const json = JSON.parse(decrypted);
      // const json = req.body;

      const { swootid } = json;

      try {
          await SwootModel.deleteOne({ _id: swootid });
          res.status(200).send({ message: 'Swoot deleted with success.' });
      } catch (error) {
          return res.status(500).send({ message: 'Something failed when trying to delete the swoot', data: error.message});
      }
  }
}

module.exports = SwootController;
