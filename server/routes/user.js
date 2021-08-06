const express = require("express");
const router = express.Router();
// const Task = require("../models/task");
const User = require("../models/user");
const corsMiddleware = require('../cors');
const bodyParser = require("body-parser");
const { response } = require("express");
// const path = require('path');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get("/", async (req, res) => {
    try {
        const user = await User.findAll({});
        if (user === null) {
            res.status(200).json({
                message: 'empty user',
                data: req.params.id
            })
        } else {
            res.status(200).json({
                message: 'get  method user',
                data: user
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
        res.send(error);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id }
        });
        console.log(user);
        if (user === null) {
            res.status(200).json({
                message: 'empty user',
                data: req.params.id
            })
        } else {
            res.status(200).json({
                message: 'get  method user',
                data: user
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
        res.send(error);
    }
})

router.put("/:id", urlencodedParser, async (req, res) => {
    try {
        const { user_name, user_email } = await req.body;


        const user = User.update({
            user_name: user_name,
            user_email: user_email,
        },
            { where: { id: req.params.id } });

        if (user === null) {
            res.status(200).json({
                message: 'empty user',
                data: req.params.id
            })
        } else {
            res.status(200).json({
                message: 'berhasil',

            })

            console.log(user_email, user_name);
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
        res.send(error);
    }
})


module.exports = router;