const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const User = require("../models/user");
const Member = require("../models/member");


router.get("/", async (req, res) => {
    try {
        const member = await Member.findAll({
            include: [

                { model: User },
                { model: Project, as: 'projectUser' }
            ]
        });
        if (member.length > 0) {
            res.status(200).json(member)
        } else {
            res.status(200).json({
                message: 'empty member',
                data: []
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
        const member = await Member.findAll({
            include: [

                { model: User },
                { model: Project, as: 'projectUser' }
            ],
            where: {
                id: req.params.id
            }
        });
        if (member.length > 0) {
            res.status(200).json(member)
        } else {
            res.status(200).json({
                message: 'empty member',
                data: []
            })
        }

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
        res.send(error);
    }
})

router.get("/user/:id", async (req, res) => {
    try {
        const member = await Member.findAll({
            include: [

                { model: User },
                { model: Project, as: 'projectUser' }
            ],
            where: {
                user_id: req.params.id
            }
        });
        if (member.length > 0) {
            res.status(200).json(member)
        } else {
            res.status(200).json({
                message: 'empty member',
                data: []
            })
        }

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
        res.send(error);
    }
})

router.post("/", async function (req, res) {

    try {
        let member = await Member.create({
            user_id: req.body.user_id,
            project_id: req.body.project_id,
        })

        res.status(201).json({
            data: member
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

});

router.delete("/:id", async (req, res) => {
    try {
        const member = await Member.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(201).json({
            message: 'data berhasil di hapus'
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
        res.send(error);
    }
})

module.exports = router;
