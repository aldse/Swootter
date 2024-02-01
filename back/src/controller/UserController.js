const { UserModel } = require('../model/UserModel');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UserController {
    static async Register(req, res) {
        // var bytes = CryptoJS.AES.decrypt(req.body.jsonCrypt, process.env.SECRET);
        // const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        // const json = JSON.parse(decrypted);
        const json = req.body;
        const { 
            name, birthdate, username,
            email, password, confirmpassword 
        } = json;

        const findUser = await UserModel.findOne({ username: username });

        var response;
        Object.entries(json).forEach(entry => {
            if (!entry[1] || entry[1] == '')
            {
                response = `${entry[0]} is mandatory!`
                return;
            }
        });
        if (response)
            return res.status(400).json({ message: response });

        if (password != confirmpassword)
            return res.status(400).json({ message: "Passwords don't match."});

        if (findUser)
            return res.status(422).json({ message: 'Someone is already using this username!'});

        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET).toString();

        const user = new UserModel({
            name: name,
            birthdate: birthdate,
            username: username,
            email: email,
            password: encryptedPassword,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            removedAt: null
        });

        try {
            await UserModel.create(user);
            res.status(201).send({ message: 'User registered with success.'});
        } catch (error) {
            return res.status(500).send({ message: 'Something failed when trying to register the user', data: error.message});
        }
    }

    static async Login(req, res) {
        // var bytes = CryptoJS.AES.decrypt(req.body.jsonCrypt, process.env.SECRET);
        // const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        // const json = JSON.parse(decrypted);
        const json = req.body;
        const { 
            value, password 
        } = json;
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET).toString();

        const findByUsername = await UserModel.findOne({ username: value });
        const findByEmail = await UserModel.findOne({ email: value });
        const findByPassword = await UserModel.findOne({ password: encryptedPassword });
        
        var response;
        Object.entries(json).forEach(entry => {
            if (!entry[1] || entry[1] == '')
            {
                response = `${entry[0]} is mandatory!`
                return;
            }
        });
        if (response)
            return res.status(400).json({ message: response });

        if (!findByUsername && !findByEmail)
            return res.status(422).json({ message: 'Invalid username or email!'});
        if (!findByPassword)
            return res.status(422).json({ message: 'Invalid password!'});

        try {
            const secret = process.env.SECRET;
            const token = jwt.sign(
                {
                    userid: findByUsername._id
                },
                secret,
                {
                    expiresIn: '1 day'
                }
            );
            res.status(200).send({ token: token });
        } catch (error) {
            return res.status(500).send({ message: 'Something failed when trying to register the user', data: error.message});
        }
    }
}

module.exports = UserController;