const mongoose = require('mongoose');

// mongoose.connect("mongodb+srv://equipo1:marco@marco.g97ls.mongodb.net/marco?retryWrites=true&w=majority")
//     .then(db => console.log('db is connected'))
//     .catch(err => console.log(err))

mongoose.connect("mongodb://localhost:27017/marco_app")
    .then(db => console.log('db is connected'))
    .catch(err => console.log(err))