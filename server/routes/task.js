const express = require("express");
const router = express.Router();
const app = express();
const Task = require("../models/task");
const User = require("../models/user");
const corsMiddleware = require('../cors');
const bodyParser = require("body-parser");
const path = require('path');
const { Op } = require('sequelize');

const saltedMd5 = require('salted-md5')
const multer = require("multer");
// upload firebase
// var admin = require("firebase-admin");
var serviceAccount = "firebase/spmm-6e307-firebase-adminsdk-x88kb-672213bdf1.json";
const bucketUrl = "gs://spmm-6e307.appspot.com";
// const gcs = require('@google-cloud/storage')({ keyFilename: serviceAccount });
// const bucket = gcs.bucket(bucketUrl);

const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    projectId: "spmm-6e307",
    keyFilename: serviceAccount
});

const bucket = storage.bucket(bucketUrl);

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: bucketUrl
// });

// app.locals.bucket = admin.storage().bucket()

// Upload
const uploadImageToStorage = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject('No file');
        }
        const name = saltedMd5(file.originalname, 'SUPER-S@LT!')
        const fileName = name + path.extname(file.originalname)
        // These options will allow temporary uploading of the file with outgoing
        // Content-Type: application/octet-stream header.
        const options = {
            version: 'v4',
            action: 'write',
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
            contentType: 'application/octet-stream',
        };
        // Get a v4 signed URL for uploading file
        bucket
            .file(fileName)
            .getSignedUrl(options, function (err, url) {
                if (err) {
                    reject(err);
                } else {
                    resolve(url)
                }
            });
    });
}

const upload = multer({
    storage: multer.memoryStorage()
})

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get("/", async (req, res) => {
    try {
        const tasks = await Task.findAll({
            include: [

                { model: User, as: 'assignedUser' },
                { model: User, as: 'createdByUser' }
            ]
        });
        if (tasks.length > 0) {
            res.status(200).json(tasks)
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



router.get("/:id", async (req, res) => {
    try {

        const task = await Task.findOne({
            include: [

                { model: User, as: 'assignedUser' },
                { model: User, as: 'createdByUser' }
            ],
            // include: { model: User, required: false },
            where: {
                id: req.params.id
            }

        });
        console.log(task);
        if (task === null) {
            res.status(200).json({
                message: 'empty task',
                data: req.params.id
            })
        } else {
            res.status(200).json({
                message: 'get  method task',
                task
            })
        }

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})

router.get("/user/:id", async (req, res) => {
    try {

        const task = await Task.findAll({
            include: [

                { model: User, as: 'assignedUser' },
                { model: User, as: 'createdByUser' }
            ],
            // include: { model: User, required: false },
            where: {
                [Op.or]: [{ assignee_id: req.params.id },
                { createdBy: req.params.id }]

            }

        });
        console.log(task);
        if (task === null) {
            res.status(200).json({
                message: 'empty task',
                data: req.params.id
            })
        } else {
            res.status(200).json({
                message: 'get  method task',
                task
            })
        }

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})

var type = upload.single('recfile');

router.post("/add", type, async function (req, res) {

    try {
        let file = req.file;
        if (!file) {
            res.status(400).send("Error: No files found")
        } else {
            const { task_tittle, due_date, description, assignee_id, createdBy } = req.body;

            uploadImageToStorage(file).then((success) => {
                console.log(success)
                Task.create({
                    task_tittle: task_tittle,
                    due_date: due_date,
                    description: description,
                    assignee_id: assignee_id,
                    file: req.file.originalname,
                    filepath: success,
                    createdBy: createdBy

                }).then(function (task) {
                    if (task) {
                        res.status(200).json({
                            message: "Masuk",
                            data: task
                        })
                    } else {
                        response.status(400).send('Error in insert new record');
                    }
                });
            }).catch((error) => {
                console.error(error);
                res.status(400).send({
                    status: error
                });
            });

        }

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
        console.log(error.message);
    }

});

router.put("/:id", type, async function (req, res) {
    try {
        let file = req.file;
        if (!file) {
            res.status(400).send("Error: No files found")
        } else {
            const { task_tittle, due_date, description, assignee_id } = req.body;

            uploadImageToStorage(file).then((success) => {
                console.log(success)
                Task.update({
                    task_tittle: task_tittle,
                    due_date: due_date,
                    description: description,
                    assignee_id: assignee_id,
                    file: req.file.originalname,
                    filepath: success,

                }, {
                    where: {
                        id: req.params.id
                    }
                }).then(function (task) {
                    if (task) {
                        res.status(200).json({
                            message: "Edit Sukses",
                            data: task
                        })
                    } else {
                        response.status(400).send('Error in insert new record');
                    }
                });
            }).catch((error) => {
                console.error(error);
                res.status(400).send({
                    status: error
                });
            });

        }

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
        console.log(error.message);
    }
});

router.delete("/:id", async function (req, res) {

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