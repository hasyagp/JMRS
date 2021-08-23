const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Message = require("../models/message");

router.get("/", async (req, res) => {
    try {
        const message_ = await Message.findAll({
            // include: Task,
            // User
            include: [

                { model: User, as: 'senderUser' },
                { model: User, as: 'receiverUser' }
            ]
        });
        if (message_.length > 0) {
            res.status(200).json({
                message: 'get  method message',
                data: message_
            })
        } else {
            res.status(200).json({
                message: 'empty message',
                data: []
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const message = await Message.findAll({
            include: [

                { model: User, as: 'senderUser' },
                { model: User, as: 'receiverUser' }
            ],
            where: {
                id: req.params.id
            }
        })
        if (message.length > 0) {
            res.status(200).json({
                message: 'get  method message',
                data: message
            })
        } else {
            res.status(200).json({
                message: 'empty message',
                data: []
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})

router.get("/receive/:id", async (req, res) => {
    try {
        const message = await Message.findAll({
            include: [

                { model: User, as: 'senderUser' },
                { model: User, as: 'receiverUser' }
            ],
            where: {
                receiver_id: req.params.id
            }
        })
        if (message.length > 0) {
            res.status(200).json({
                message: 'get  method message',
                data: message
            })
        } else {
            res.status(200).json({
                message: 'empty message',
                data: []
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})

router.post("/", async function (req, res) {

    try {
        let message = await Message.create({
            text: req.body.text,
            sender_id: req.body.sender_id,
            receiver_id: req.body.receiver_id,
        })

        res.status(201).json({
            data: message
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

});

module.exports = router;