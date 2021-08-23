const express = require("express");
const router = express.Router();
const Project = require("../models/project");


router.get("/", async (req, res) => {
    try {
        const project = await Project.findAll({

        });
        if (project.length > 0) {
            res.status(200).json({
                message: 'get  method project',
                project
            })
        } else {
            res.status(200).json({
                message: 'empty project',
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
        const project = await Project.findAll({
            where: {
                id: req.params.id
            }
        });
        if (project.length > 0) {
            res.status(200).json({
                message: 'get  method project',
                project
            })
        } else {
            res.status(200).json({
                message: 'empty project',
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
        let project = await Project.create({
            project_name: req.body.project_name,
            status: req.body.status,
            due_date: req.body.due_date,
        })

        res.status(201).json({
            data: project
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

});

router.put("/:id", async function (req, res) {

    try {
        let project = await Project.update({
            project_name: req.body.project_name,
            status: req.body.status,
            due_date: req.body.due_date,
        }, {
            where: {
                id: req.params.id
            }
        }
        )

        res.status(201).json({
            message: "Update success", project
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

});

router.delete("/:id", async function (req, res) {

    try {
        let project = await Project.destroy({
            where: {
                id: req.params.id
            }
        }
        )

        res.status(201).json({
            message: "Delete success"
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

});

module.exports = router;
