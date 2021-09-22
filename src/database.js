const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
    .then(db => console.log('db is connected'))
    .catch(err => console.log(err))