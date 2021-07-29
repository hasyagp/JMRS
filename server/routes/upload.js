const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const multer = require('multer');
const path = require('path');
const XlsxPopulate = require('xlsx-populate');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "upload"));
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0])
    }
});

var upload = multer({ storage: storage })


// upload file 
router.post("/upload_file", upload.array("file"), uploadFiles);

function uploadFiles(req, res) {
    console.log(req.body);
    console.log(req.files);
    console.log(__dirname);
    res.json({ message: "Successfully uploaded files" });
}

// Merge 2 file
var cpUpload = upload.fields([{ name: 'excel1', maxCount: 1 }, { name: 'excel2', maxCount: 1 }])
router.post("/merge_files", cpUpload, mergeFiles);


function mergeFiles(req, res) {
    console.log(req.body['excel1']);
    console.log(req.data);
    console.log(req.files['excel1']);

    // Promise.all([
    //     XlsxPopulate.fromFileAsync(req.files['excel1'].path),
    //     XlsxPopulate.fromFileAsync(req.files['excel2'].path)
    // ])
    //     .then(workbooks => {
    //         const workbook = workbooks[0];
    //         const workbook2 = workbooks[1];
    //         const sheets2 = workbook2.sheets();
    //         // const newSheet = workbook.addSheet("aaa", sheets2);

    //         sheets2.forEach(sheet => {
    //             const newSheet = workbook.addSheet(sheet.name());
    //             const usedRange = sheet.usedRange();
    //             const oldValues = usedRange.value();

    //             newSheet.range(usedRange.address()).value(oldValues);
    //         });

    //         return workbook.toFileAsync(path.join(__dirname, "upload", req.files['excel2'][0].originalname.match(/\..*$/)[0] + ".xlsx"));
    //     });
    res.json({ message: "Successfully merge files" });
}


module.exports = router;
