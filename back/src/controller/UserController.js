const { UserModel } = require('../model/UserModel');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function Decrypt(text) {
    var decrypted = CryptoJS.AES.decrypt(text, process.env.SECRET).toString(CryptoJS.enc.Utf8);
    return decrypted;
}

class UserController {
    static async Register(req, res) {
        var decrypted = Decrypt(req.body.jsonCrypt);
        const json = JSON.parse(decrypted);
        // const json = req.body;
        
        const { 
            name, birthdate, username,
            email, password, confirmpassword 
        } = json;

        const findByUsernameOrEmail = await UserModel.findOne({ $or: [{ username: username }, { email: email }]});

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
        if (findByUsernameOrEmail)
            return res.status(422).json({ message: 'Username or email is already being used!'});

        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET).toString();

        const user = new UserModel({
            name: name,
            birthdate: birthdate,
            username: username,
            email: email,
            password: encryptedPassword,
            img: null,
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
        var decrypted = Decrypt(req.body.jsonCrypt);
        const json = JSON.parse(decrypted);
        // const json = req.body;

        const { 
            value, password 
        } = json;

        const findByUsernameOrEmail = await UserModel.findOne({ $or: [{ username: value }, { email: value }]});
        
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

        if (!findByUsernameOrEmail)
            return res.status(422).json({ message: 'Invalid username or email!'});

        var decrypted = Decrypt(findByUsernameOrEmail.password);
        if (decrypted != password)
            return res.status(422).json({ message: 'Invalid password!'});
        
        try {
            const secret = process.env.SECRET;
            const token = jwt.sign(
                {
                    userid: findByUsernameOrEmail._id
                },
                secret,
                {
                    expiresIn: '1 day'
                }
            );
            res.status(200).send({ message: "User logged in with success.", token: token});
        } catch (error) {
            return res.status(500).send({ message: 'Something failed when trying to register the user', data: error.message});
        }
    }

    static async getUserById(req, res) {
        const userid = req.params.id;

        try {
            const user = await UserModel.findById(userid);
            res.status(200).send({ user: user, message: 'User found with success.' });
        } catch (error) {
            return res.status(500).send({ message: 'Something failed when trying to find the user', data: error.message});
        }
    }

    static async DeleteByJwt(req, res) {
        var decrypted = Decrypt(req.body.jsonCrypt);
        const json = JSON.parse(decrypted);
        // const json = req.body;

        const { token } = json;
        const userid = jwt.decode(token).userid;

        try {
            await UserModel.deleteOne({ _id: userid });
            res.status(200).send({ message: 'User deleted with success.' });
        } catch (error) {
            return res.status(500).send({ message: 'Something failed when trying to delete the user', data: error.message});
        }
    }

    static async DeleteById(req, res) {
        const userid = req.params.id;

        try {
            await UserModel.deleteOne({ _id: userid });
            res.status(200).send({ message: 'User deleted with success.' });
        } catch (error) {
            return res.status(500).send({ message: 'Something failed when trying to delete the user', data: error.message});
        }
    }
}

module.exports = UserController;