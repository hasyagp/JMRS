const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const User = require("../models/user");
const Comment = require("../models/comment");

router.get("/", async (req, res) => {
    try {
        const comment = await Comment.findAll({
            // include: Task,
            // User
            include: [{

                model: Task,
                include: { model: User }
            }]
        });
        if (comment.length > 0) {
            res.status(200).json({
                message: 'get  method comment',
                data: comment
            })
        } else {
            res.status(200).json({
                message: 'empty comment',
                data: []
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})


router.get("/:task_id", async (req, res) => {
    try {
        const comment = await Comment.findAll({
            where: {
                task_id: req.params.task_id
            }, include: [{
                model: User
            }, {
                model: Task
            }]
        })
        if (comment.length > 0) {
            res.status(200).json({
                message: 'get  method comment',
                data: comment
            })
        } else {
            res.status(200).json({
                message: 'empty comment',
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
        let comment = await Comment.create({
            text: req.body.text,
            task_id: req.body.task_id,
            user_id: req.body.user_id,
        })

        res.status(201).json({
            data: comment
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

});

router.put("/:id", async function (req, res) {

    try {
        let comment = await Comment.update({
            text: req.body.text,
            task_id: req.body.task_id,
            user_id: req.body.user_id,
        }, {
            where: {
                id: req.params.id
            }
        })

        res.status(201).json({
            message: 'data berhasil di update'
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

});

router.delete("/:id", async function (req, res) {

    try {
        let comment = await Comment.destroy({
            where: {
                comment_id: req.params.comment_id
            }
        })
        res.status(201).json({
            message: 'data berhasil di hapus'
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

});


module.exports = router;