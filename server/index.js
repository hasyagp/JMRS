const express = require("express");
const bodyParser = require("body-parser");
const multer = require('multer');
var upload = multer();
var app = express();
const db = require("./config/db");
const path = require('path');


const auth = require("./routes/auth");
const user = require("./routes/user");
const task = require("./routes/task");
const comment = require("./routes/comment");
const message = require("./routes/message");
const project = require("./routes/project");
const member = require("./routes/member");
// path to upload
const upload_path = require("./routes/upload");

// app.use(express.urlencoded({ extended: false }));
// app.options('*', corsMiddleware);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
// app.use(express.json());
// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({
    extended: true
}));
//form-urlencoded

// for parsing multipart/form-data
// app.use(upload.array());
// app.use(express.static('public'));


db.authenticate().then(() => console.log("database connection success"));

// require("./routes/auth")(app);
app.use('/auth', auth);
app.use('/user', user);
app.use('/task', task);
app.use('/comment', comment);
app.use('/message', message);
app.use('/upload', upload_path);
app.use('/project', project);
app.use('/member', member);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});