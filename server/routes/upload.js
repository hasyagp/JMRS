const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const multer = require('multer');
const path = require('path');
const XlsxPopulate = require('xlsx-populate');
const { memoryStorage } = require("multer");
const saltedMd5 = require('salted-md5')

const upload = multer({
    storage: multer.memoryStorage()
})

// Firebase
var serviceAccount = "firebase/spmm-6e307-firebase-adminsdk-x88kb-672213bdf1.json";
const bucketUrl = "gs://spmm-6e307.appspot.com";
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    projectId: "spmm-6e307",
    keyFilename: serviceAccount
});

const bucket = storage.bucket(bucketUrl);

// Upload
const uploadFileToStorage = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject('No file');
        }
        const name = saltedMd5(file.originalname, 'SUPER-S@LT!')
        const fileName = name + ".xlsx"
        // These options will allow temporary uploading of the file with outgoing
        // Content-Type: application/octet-stream header.
        const options = {
            version: 'v4',
            action: 'read',
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
            contentType: 'application/octet-stream',
        };
        // Get a v4 signed URL for uploading file
        bucket
            .file(fileName)
            .getdo
            .getSignedUrl(options, function (err, url) {
                if (err) {
                    reject(err);
                } else {
                    resolve(url)
                }
            });
    });
}

// Merge 2 file
var cpUpload = upload.fields([{ name: 'excel1', maxCount: 1 }, { name: 'excel2', maxCount: 1 }])
router.post("/merge_files", cpUpload, mergeFiles);


function mergeFiles(req, res) {
    try {
        let file1 = req.files['excel1'];
        let file2 = req.files['excel2'];
        if (!file1 && !file2) {
            res.status(400).send("Error: No files found")
        } else {
            Promise.all([
                XlsxPopulate.fromDataAsync(file1[0].buffer),
                XlsxPopulate.fromDataAsync(file2[0].buffer)
            ])
                .then(workbooks => {
                    const workbook = workbooks[0];
                    const workbook2 = workbooks[1];
                    const sheets2 = workbook2.sheets();
                    // const newSheet = workbook.addSheet("aaa", sheets2);

                    sheets2.forEach(sheet => {
                        const newSheet = workbook.addSheet(sheet.name());
                        const usedRange = sheet.usedRange();
                        const oldValues = usedRange.value();

                        newSheet.range(usedRange.address()).value(oldValues);
                    });
                    return workbook.outputAsync();
                })
                .then((data) => {

                    // Set the output file name.
                    res.attachment("output.xlsx");

                    // Send the workbook.
                    res.send(data);

                })
                .catch((error) => {
                    console.error(error);
                    res.status(400).send({
                        message: error
                    });
                });
        }

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
        console.log(error.message);
    }
}


module.exports = router;
