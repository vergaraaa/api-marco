const express = require('express'); 
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const { v4: uuid } = require('uuid');
const path = require('path')
const app = express();

// settings
app.set('port', process.env.PORT || 10021);

// database
require('./database.js');

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, "public/uploads"),
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
    }
});

app.use(multer({
    storage: storage,
    dest: path.join(__dirname, "/public/uploads"),
    limits: {fileSize: 3000000},
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if(mimetype && extname)
            return cb(null, true);
        cb("error: file must be a valid image");
    }
}).array("files", 12));

// routes 
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/expos", require("./routes/expos.routes"));
app.use("/api/collaborators", require("./routes/collaborators.routes"));
app.use("/api/activities", require("./routes/activities.routes"));

module.exports = app;