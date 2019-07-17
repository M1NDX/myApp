'use strict'
let mongoose = require("mongoose");

let mongoDB = 'mongodb://localhost:27017/UsuariosDB';
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true
});


module.exports = {mongoose}