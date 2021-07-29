const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const User = require("../models/user");
const corsMiddleware = require('../cors');
const bodyParser = require("body-parser");
// const path = require('path');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get("/", async (req, res) => {
    try {
        const task = await Task.findAll({
            include: { model: User }
        });
        if (task.length > 0) {
            res.status(200).json({
                // message: 'get  method task',
                // data:
                task
            })
        } else {
            res.status(200).json({
                message: 'empty task',
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


router.get("/:task_tittle", async (req, res) => {
    try {

        const task = await Task.findAll({
            include: { model: User, required: false },
            where: {
                task_tittle: req.params.task_tittle
            }

        })
        // if (task.length > 0) {
        res.status(200).json({
            message: 'get  method task',
            data: task
        })
        // })
        // } else {
        //     res.status(200).json({
        //         message: 'empty task',
        //         data: []
        //     })
        // }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})

router.get("/:id", async (req, res) => {
    try {

        const task = await Task.findAll({
            include: { model: User, required: false },
            where: {
                id: req.params.id
            }

        })
        // if (task.length > 0) {
        res.status(200).json({
            message: 'get  method task',
            data: task
        })
        // })
        // } else {
        //     res.status(200).json({
        //         message: 'empty task',
        //         data: []
        //     })
        // }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})

router.post("/add", async function (req, res) {

    try {
        // if (!req.body.task_tittle) {
        //     res.status(400).send({
        //         message: "Tittle can not be empty!"
        //     });
        // }
        console.log(req.body);
        const { task_tittle, due_date, description, file, assignee_id } = req.body;

        const newTask = new Task({
            task_title,
            due_date,
            description,
            file,
            assignee_id,
        });

        await newTask.save();
        res.json(newTask);

        // res.status(201).json({
        //     data: task
        // })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
        console.log(error.message);
    }

});

router.put("/:id", urlencodedParser, async function (req, res) {

    try {
        let task = await Task.update({
            task_tittle: req.body.task_tittle,
            due_date: req.body.due_date,
            description: req.body.description,
            file: req.body.file,
            completed: req.body.completed,
            assignee_id: req.body.assignee_id,
            completedAt: req.body.completedAt,
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

router.delete("/:id", urlencodedParser, async function (req, res) {

    try {
        let task = await Task.destroy({
            where: {
                id: req.params.id
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