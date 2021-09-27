const express = require('express'); 
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// database
require('./database.js');

// middlewares
app.use(morgan('dev'));
app.use(cors());

// app.use(cors());
app.use(express.json());

// routes 
app.use("/api/users", require("./routes/users.routes"));

module.exports = app;